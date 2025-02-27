import { IEvaluationService } from '../../services/evaluationService'
import { BaseController, RequestDTO } from '../../shared/controllers/BaseController'
import { MoveAnalysisResponseDTO } from './MoveAnalysisResponseDTO'
import { MoveAnalysisRequestDTO } from './MoveAnalysisRequestDTO'
import { Chess, validateFen } from 'chess.js'
import { GameAlreadyOver, InvalidFEN, InvalidMove } from './MoveAnalysisErrors'
import { ServiceError } from '../../shared/errors/ServiceErrors'
import { ChessUtils } from '../../shared/utils/ChessUtils'
import { EvaluationUtils } from '../../shared/utils/EvaluationUtils'
import { getMoveClassification } from '../../scripts/evaluationScripts'
import { MoveColor } from '../../shared/types/MoveColor'

export class MoveAnalysisController extends BaseController<MoveAnalysisRequestDTO, never, MoveAnalysisResponseDTO> {
  private readonly stockfishService: IEvaluationService
  private readonly lichessService: IEvaluationService

  constructor(stockfishService: IEvaluationService, lichessService: IEvaluationService) {
    super('Move Analysis Controller')
    this.stockfishService = stockfishService
    this.lichessService = lichessService
  }

  protected async executeController(
    request: RequestDTO<MoveAnalysisRequestDTO, never>,
  ): Promise<MoveAnalysisResponseDTO> {
    const { fen, depth, move } = request.query

    if (!validateFen(fen).ok) throw new InvalidFEN()
    const chessGame = new Chess(fen)
    if (chessGame.isGameOver()) throw new GameAlreadyOver()

    const playerTurn = chessGame.turn()
    let opponentTurn
    try {
      chessGame.move(move)
      opponentTurn = chessGame.turn()
    } catch {
      throw new InvalidMove()
    }

    let evalBeforeMove
    try {
      evalBeforeMove = await this.lichessService.evaluate(fen, depth)
    } catch (error: any) {
      if (error instanceof ServiceError) {
        evalBeforeMove = await this.stockfishService.evaluate(fen, depth)
      } else throw error
    }

    if (chessGame.isGameOver()) {
      return {
        bestMove: ChessUtils.convertToSan(fen, evalBeforeMove.bestMove),
        evaluation: EvaluationUtils.getGameResult(chessGame),
        classification: 'BEST',
      }
    }

    let evalAfterMove
    try {
      evalAfterMove = await this.lichessService.evaluate(chessGame.fen(), depth)
    } catch (error: any) {
      if (error instanceof ServiceError) {
        evalAfterMove = await this.stockfishService.evaluate(chessGame.fen(), depth)
      } else throw error
    }

    const finalEvaluation = EvaluationUtils.changeEvaluationPrespective(
      evalAfterMove.evaluation,
      MoveColor[playerTurn],
      MoveColor[opponentTurn],
    )
    return {
      bestMove: ChessUtils.convertToSan(fen, evalBeforeMove.bestMove),
      evaluation: finalEvaluation,
      classification:
        ChessUtils.convertToLan(fen, move) === evalBeforeMove.bestMove
          ? 'BEST'
          : getMoveClassification(evalBeforeMove.evaluation, finalEvaluation),
    }
  }
}
