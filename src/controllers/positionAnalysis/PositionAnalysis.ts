import { IEvaluationService } from '../../services/evaluationService'
import { BaseController, RequestDTO } from '../../shared/controllers/BaseController'
import { PositionAnalysisRequestDTO } from './PositionAnalysisRequestDTO'
import { PositionAnalysisResponseDTO } from './PositionAnalysisResponseDTO'

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

  protected async executeController(
    request: RequestDTO<PositionAnalysisRequestDTO, never>,
  ): Promise<PositionAnalysisResponseDTO> {
    const { fen, depth } = request.query

    return {
      bestMove: '',
      evaluation: '',
    }
  }
}
