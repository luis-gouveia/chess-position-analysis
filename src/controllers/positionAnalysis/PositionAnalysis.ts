import { Request } from 'express'
import { IEvaluationService } from '../../services/evaluationService'
import { BaseController } from '../../shared/controllers/BaseController'

export interface PositionAnalysisRequestDTO {
  fen: string
  depth: number
}

export interface PositionAnalysisResponseDTO {
  bestMove: string
  evaluation: string
  opening?: string
}

export class PositionAnalysisController extends BaseController<PositionAnalysisResponseDTO> {
  private readonly stockfishService: IEvaluationService
  private readonly lichessService: IEvaluationService

  constructor(stockfishService: IEvaluationService, lichessService: IEvaluationService) {
    super('Position Analysis Controller')
    this.stockfishService = stockfishService
    this.lichessService = lichessService
  }

  protected async executeController(request: Request): Promise<PositionAnalysisResponseDTO> {
    return {
      bestMove: '',
      evaluation: '',
    }
  }
}
