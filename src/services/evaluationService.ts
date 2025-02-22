export interface PositionEval {
  bestMove: string
  evaluation: string
}

export interface IEvaluationService {
  evaluate(fen: string, depth: number): Promise<PositionEval>
}
