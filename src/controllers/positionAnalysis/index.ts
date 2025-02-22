import { lichessService, stockfishService } from '../../services'
import { PositionAnalysisController } from './PositionAnalysis'
import { PositionAnalysisRequestSchema } from './PositionAnalysisRequestDTO'

const positionAnalysisController = new PositionAnalysisController(stockfishService, lichessService)
const positionAnalysisRequestSchema = new PositionAnalysisRequestSchema()

export { positionAnalysisController, positionAnalysisRequestSchema }
