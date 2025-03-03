import { InvalidConfigValue } from '../shared/errors/ConfigErrors'
import { ConfigUtils } from '../shared/utils/ConfigUtils'
import { IEvaluationService } from './evaluationService'
import { FakeEvaluationService } from './fakeEvaluationService/fakeEvaluationService'
import { LichessService } from './lichessEvaluationService/lichessService'
import { StockfishService } from './stockfishEvaluationService/stockfishService'

const evaluation = ConfigUtils.get('services.evaluation')
let stockfishService: IEvaluationService
let lichessService: IEvaluationService
switch (evaluation) {
  case 'fake':
    stockfishService = new FakeEvaluationService()
    lichessService = new FakeEvaluationService()
    break
  case 'stockfish':
    stockfishService = new StockfishService()
    lichessService = new LichessService()
    break
  default:
    throw new InvalidConfigValue('evaluation service')
}

export { stockfishService, lichessService }
