import { IEvaluationService, PositionEval } from '../../services/evaluationService'
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
import { getOpening } from '../../scripts/openingsScripts'
import { Classification } from '../../shared/types/Classification'

export class MoveAnalysisController extends BaseController<MoveAnalysisRequestDTO, never, MoveAnalysisResponseDTO> {
  private readonly stockfishService: IEvaluationService
  private readonly lichessService: IEvaluationService

  constructor(stockfishService: IEvaluationService, lichessService: IEvaluationService) {
    super('Move Analysis Controller')
    this.stockfishService = stockfishService
    this.lichessService = lichessService
  }

  private async callEvaluationServices(fen: string, depth: number): Promise<PositionEval> {
    let evaluation
    try {
      evaluation = await this.lichessService.evaluate(fen, depth)
    } catch (error: any) {
      if (error instanceof ServiceError) {
        evaluation = await this.stockfishService.evaluate(fen, depth)
      } else throw error
    }
    return evaluation
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

    const evalBeforeMove = await this.callEvaluationServices(fen, depth)
    if (chessGame.isGameOver()) {
      return {
        bestMove: ChessUtils.convertToSan(fen, evalBeforeMove.bestMove),
        evaluation: EvaluationUtils.getGameResult(chessGame),
        classification: chessGame.isStalemate() ? 'MISTAKE' : 'BEST',
      }
    }

    const evalAfterMove = await this.callEvaluationServices(chessGame.fen(), depth)
    const finalEvaluation = EvaluationUtils.changeEvaluationPrespective(
      evalAfterMove.evaluation,
      MoveColor[playerTurn],
      MoveColor[opponentTurn],
    )

    const opening = getOpening(chessGame.fen())
    let classification: Classification
    if (opening) classification = 'BOOK'
    else if (ChessUtils.convertToLan(fen, move) === evalBeforeMove.bestMove) classification = 'BEST'
    else classification = getMoveClassification(evalBeforeMove.evaluation, finalEvaluation)

    return {
      bestMove: ChessUtils.convertToSan(fen, evalBeforeMove.bestMove),
      evaluation: finalEvaluation,
      classification,
      opening,
    }
  }
}
