import { Chess } from 'chess.js'
import { MoveColor } from '../types/MoveColor'
import { Evaluation } from '../types/Evaluation'

export abstract class EvaluationUtils {
  public static changePrespective(evaluation: Evaluation, prespective: MoveColor, turn: MoveColor): Evaluation {
    if (turn === prespective) return evaluation
    return {
      type: evaluation.type,
      value: evaluation.value * -1,
    }
  }

  public static stringify(evaluation: Evaluation): string {
    return `${evaluation.type === 'M' ? evaluation.type : ''}${evaluation.value}`
  }

  public static getGameResult(game: Chess | string): string {
    game = game instanceof Chess ? game : new Chess(game)

    if (!game.isGameOver()) return '0-0'
    if (game.isDraw() || game.isStalemate()) return '1/2-1/2'
    if (game.turn() === 'b') return '1-0'
    else return '0-1'
  }
}
