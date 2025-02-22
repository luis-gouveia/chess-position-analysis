export interface MoveAnalysisResponseDTO {
  bestMove: string
  classification: string // TODO: enum BEST, FORCED, BLUNDER, BOOK, ...
  evaluation: string
  opening?: string
}
