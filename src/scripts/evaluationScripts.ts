import { Classification } from '../shared/types/Classification'
import { Evaluation } from '../shared/types/Evaluation'

function evalWinningChances(evaluation: Evaluation): number {
  let cp
  if (evaluation.type === 'M') {
    const unsignedCp = (21 - Math.min(10, Math.abs(evaluation.value))) * 100
    cp = unsignedCp * (evaluation.value > 0 ? 1 : -1)
  } else {
    cp = Math.min(Math.max(-1000, evaluation.value), 1000)
  }

  return 2 / (1 + Math.exp(-0.00368208 * cp)) - 1
}

export function getMoveClassification(evalBefore: Evaluation, evalAfter: Evaluation): Classification {
  const shift = ((evalWinningChances(evalAfter) - evalWinningChances(evalBefore)) / 2) * -1
  if (shift < 0.025) return 'GOOD'
  else if (shift < 0.06) return 'INACCURACY'
  else if (shift < 0.14) return 'MISTAKE'
  else return 'BLUNDER'
}
