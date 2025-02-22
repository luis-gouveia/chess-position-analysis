import Worker from 'web-worker'
import { IEvaluationService, PositionEval } from '../evaluationService'
import path from 'path'
import { PathUtils } from '../../shared/utils/PathUtils'
import { FailedToGetEvaluation } from '../evaluationServiceErrors'

export class StockfishService implements IEvaluationService {
  private mapResponse(message: string): PositionEval {
    const bestMove = message.slice(message.indexOf(' pv') + 4).split(' ')[0]
    let evaluation: string
    if (message.includes('score mate')) {
      evaluation = 'M' + message.slice(message.indexOf('score mate') + 11, message.indexOf('nodes') - 1)
    } else {
      evaluation = message.slice(message.indexOf('cp') + 3, message.indexOf('nodes') - 1)
    }
    return { bestMove, evaluation }
  }

  public async evaluate(fen: string, depth: number): Promise<PositionEval> {
    const stockfishPath = path.join(__dirname, '../../resources/stockfish.js')
    const engine = new Worker(PathUtils.normalize(stockfishPath))
    engine.postMessage('uci')
    engine.postMessage('isready')
    engine.postMessage('setoption name MultiPV value 1')

    const engineEvaluation = new Promise<PositionEval>((res, rej) => {
      engine.postMessage(`position fen ${fen}`)
      engine.postMessage(`go depth ${depth}`)

      engine.addEventListener('message', (event: any) => {
        const message = event.data as string
        console.log(event.data) // TODO: remove

        if (
          message.startsWith(`info depth ${depth}`) &&
          !message.includes('lowerbound') &&
          !message.includes('upperbound')
        ) {
          engine.terminate()
          res(this.mapResponse(message))
        }
      })

      engine.addEventListener('error', (event: any) => {
        engine.terminate()
        rej(event)
      })
    })

    try {
      const evaluation = await engineEvaluation
      return evaluation
    } catch (error: any) {
      throw new FailedToGetEvaluation(error, StockfishService.name)
    }
  }
}
