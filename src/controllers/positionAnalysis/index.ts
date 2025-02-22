import { lichessService, stockfishService } from '../../services'
import { PositionAnalysisController } from './PositionAnalysis'
import { PositionAnalysisRequestSchema } from './PositionAnalysisRequestSchema'

const positionAnalysisController = new PositionAnalysisController(stockfishService, lichessService)
const positionAnalysisRequestSchema = new PositionAnalysisRequestSchema()

export { positionAnalysisController, positionAnalysisRequestSchema }
