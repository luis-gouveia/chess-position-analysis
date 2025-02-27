import { Chess } from 'chess.js'
import { MoveColor } from '../types/MoveColor'

export abstract class EvaluationUtils {
  public static changeEvaluationPrespective(evaluation: string, prespective: MoveColor, turn: MoveColor): string {
    if (turn === prespective) return evaluation

    let prefix = ''
    if (evaluation.startsWith('M')) {
      prefix = 'M'
      evaluation = evaluation.split('M')[1]
    }
    return `${prefix}${Number(evaluation) * -1}`
  }

  public static getGameResult(game: Chess | string): string {
    game = game instanceof Chess ? game : new Chess(game)

    if (!game.isGameOver()) return '0-0'
    if (game.isDraw() || game.isStalemate()) return '1/2-1/2'
    if (game.turn() === 'b') return '1-0'
    else return '0-1'
  }
}
