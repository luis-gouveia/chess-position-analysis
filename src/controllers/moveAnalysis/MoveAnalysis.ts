import { IEvaluationService } from '../../services/evaluationService'
import { BaseController, RequestDTO } from '../../shared/controllers/BaseController'
import { MoveAnalysisResponseDTO } from './MoveAnalysisResponseDTO'
import { MoveAnalysisRequestDTO } from './MoveAnalysisRequestDTO'

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
    return {
      bestMove: '',
      evaluation: '',
      classification: '',
    }
  }
}
