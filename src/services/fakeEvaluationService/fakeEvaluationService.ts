import { IEvaluationService, PositionEval } from '../evaluationService'
import { Chess } from 'chess.js'
import { ChessUtils } from '../../shared/utils/ChessUtils'

export class FakeEvaluationService implements IEvaluationService {
  public async evaluate(fen: string): Promise<PositionEval> {
    const game = new Chess(fen)
    return {
      bestMove: ChessUtils.convertToLan(fen, game.moves()[0]),
      evaluation: { type: 'CP', value: Math.floor(Math.random() * 21) - 10 },
    }
  }
}
