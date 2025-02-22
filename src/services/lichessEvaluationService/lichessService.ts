import axios from 'axios'
import { IEvaluationService, PositionEval } from '../evaluationService'

export class LichessService implements IEvaluationService {
  public async evaluate(fen: string, depth: number): Promise<PositionEval> {
    const { data, status } = await axios.get(`https://lichess.org/api/cloud-eval?fen=${fen}`)
    if (status === 404 || data.depth < depth) throw new Error()

    console.log(data)
    const bestLine = data.pvs[0]
    if (!bestLine) throw new Error()

    const evalScore = bestLine.cp ?? bestLine.mate
    if (!evalScore) throw new Error()

    const evaluation = `${bestLine.cp ? '' : 'M'}${evalScore}`
    const bestMove = bestLine.moves.split(' ')[0]
    return { bestMove, evaluation }
  }
}
