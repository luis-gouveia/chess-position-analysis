import axios from 'axios'
import { IEvaluationService, PositionEval } from '../evaluationService'
import { FailedToGetEvaluation, InvalidEvaluationDepth, InvalidEvaluationData } from '../evaluationServiceErrors'

export class LichessService implements IEvaluationService {
  public async evaluate(fen: string, depth: number): Promise<PositionEval> {
    let data
    try {
      const response = await axios.get(`https://lichess.org/api/cloud-eval?fen=${fen}`)
      data = response.data
    } catch (error: any) {
      throw new FailedToGetEvaluation(error.response.data, LichessService.name)
    }
    if (data.depth < depth) throw new InvalidEvaluationDepth(LichessService.name)

    const bestLine = data.pvs[0]
    const evalScore = bestLine.cp ?? bestLine.mate
    if (!bestLine || !evalScore) throw new InvalidEvaluationData(data, LichessService.name)

    const evaluation = `${bestLine.cp ? '' : 'M'}${evalScore}`
    const bestMove = bestLine.moves.split(' ')[0]
    return { bestMove, evaluation }
  }
}
