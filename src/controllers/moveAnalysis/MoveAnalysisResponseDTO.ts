import { Classification } from '../../shared/types/Classification'

export interface MoveAnalysisResponseDTO {
  bestMove: string
  classification: Classification
  evaluation: string
  opening?: string
}
