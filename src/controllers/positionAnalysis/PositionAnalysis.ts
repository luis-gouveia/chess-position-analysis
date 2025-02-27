import { Chess, validateFen } from 'chess.js'
import { IEvaluationService, PositionEval } from '../../services/evaluationService'
import { BaseController, RequestDTO } from '../../shared/controllers/BaseController'
import { PositionAnalysisRequestDTO } from './PositionAnalysisRequestDTO'
import { PositionAnalysisResponseDTO } from './PositionAnalysisResponseDTO'
import { ServiceError } from '../../shared/errors/ServiceErrors'
import { GameAlreadyOver, InvalidFEN } from './PositionAnalysisErrors'
import { EvaluationUtils } from '../../shared/utils/EvaluationUtils'
import { MoveColor } from '../../shared/types/MoveColor'
import { ChessUtils } from '../../shared/utils/ChessUtils'
import { getOpening } from '../../scripts/openingsScripts'

export class PositionAnalysisController extends BaseController<
  PositionAnalysisRequestDTO,
  never,
  PositionAnalysisResponseDTO
> {
  private readonly stockfishService: IEvaluationService
  private readonly lichessService: IEvaluationService

  constructor(stockfishService: IEvaluationService, lichessService: IEvaluationService) {
    super('Position Analysis Controller')
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
    request: RequestDTO<PositionAnalysisRequestDTO, never>,
  ): Promise<PositionAnalysisResponseDTO> {
    const { fen, depth, prespective } = request.query

    if (!validateFen(fen).ok) throw new InvalidFEN()
    const chessGame = new Chess(fen)
    if (chessGame.isGameOver()) throw new GameAlreadyOver()

    const positionEval = await this.callEvaluationServices(fen, depth)

    const turn = chessGame.turn()
    return {
      bestMove: ChessUtils.convertToSan(fen, positionEval.bestMove),
      evaluation: EvaluationUtils.changeEvaluationPrespective(
        positionEval.evaluation,
        prespective ?? MoveColor.w,
        MoveColor[turn],
      ),
      opening: getOpening(fen),
    }
  }
}
