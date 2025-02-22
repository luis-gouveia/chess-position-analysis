import { LichessService } from './lichessEvaluationService/lichessService'
import { StockfishService } from './stockfishEvaluationService/stockfishService'

const stockfishService = new StockfishService()
const lichessService = new LichessService()

export { stockfishService, lichessService }
