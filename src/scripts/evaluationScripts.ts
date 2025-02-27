import { Classification } from '../shared/types/Classification'

function evalWinningChances(evaluation: string): number {
  const normalizedEvaluation = evaluation.startsWith('M') ? Number(evaluation.split('M')[1]) : Number(evaluation)
  let cp
  if (evaluation.startsWith('M')) {
    const unsignedCp = (21 - Math.min(10, Math.abs(normalizedEvaluation))) * 100
    cp = unsignedCp * (normalizedEvaluation > 0 ? 1 : -1)
  } else {
    cp = Math.min(Math.max(-1000, normalizedEvaluation), 1000)
  }

  return 2 / (1 + Math.exp(-0.00368208 * cp)) - 1
}

export function getMoveClassification(evalBefore: string, evalAfter: string): Classification {
  const shift = ((evalWinningChances(evalAfter) - evalWinningChances(evalBefore)) / 2) * -1
  if (shift < 0.025) return 'GOOD'
  else if (shift < 0.06) return 'INACCURACY'
  else if (shift < 0.14) return 'MISTAKE'
  else return 'BLUNDER'
}
