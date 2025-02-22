import { lichessService, stockfishService } from '../../services'
import { MoveAnalysisController } from './MoveAnalysis'
import { MoveAnalysisRequestSchema } from './MoveAnalysisRequestDTO'

const moveAnalysisController = new MoveAnalysisController(stockfishService, lichessService)
const moveAnalysisRequestSchema = new MoveAnalysisRequestSchema()

export { moveAnalysisController, moveAnalysisRequestSchema }
