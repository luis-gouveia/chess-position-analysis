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
}
