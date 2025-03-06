import { Classification } from '../../shared/types/Classification'

export interface MoveAnalysisResponseDTO {
  evaluation: string
  bestMove?: string
  classification?: Classification
  opening?: string
}
