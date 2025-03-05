import { Evaluation } from '../shared/types/Evaluation'

export interface PositionEval {
  bestMove: string
  evaluation: Evaluation
}

export interface IEvaluationService {
  evaluate(fen: string, depth: number): Promise<PositionEval>
}
