import { Request } from 'express'
import { IEvaluationService } from '../../services/evaluationService'
import { BaseController } from '../../shared/controllers/BaseController'

export interface MoveAnalysisResponseDTO {
  bestMove: string
  classification: string // BEST, FORCED, BLUNDER, BOOK, ...
  evaluation: string //???????????
  opening?: string
}

export class MoveAnalysisController extends BaseController<MoveAnalysisResponseDTO> {
  private readonly stockfishService: IEvaluationService
  private readonly lichessService: IEvaluationService

  constructor(stockfishService: IEvaluationService, lichessService: IEvaluationService) {
    super('Move Analysis Controller')
    this.stockfishService = stockfishService
    this.lichessService = lichessService
  }

  protected async executeController(request: Request): Promise<MoveAnalysisResponseDTO> {
    return {
      bestMove: '',
      evaluation: '',
      classification: '',
    }
  }
}
