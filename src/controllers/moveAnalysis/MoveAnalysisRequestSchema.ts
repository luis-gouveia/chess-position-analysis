import { z, ZodObject, ZodTypeAny } from 'zod'
import { BaseValidatorSchema } from '../../shared/middleware/RequestParametersValidator'

interface MoveAnalysisRequestDTO {
  fen: string
  depth: number
  move: string
}

export class MoveAnalysisRequestSchema implements BaseValidatorSchema<MoveAnalysisRequestDTO> {
  public get(): ZodObject<Record<keyof MoveAnalysisRequestDTO, ZodTypeAny>> {
    return z.object({
      fen: z.string(),
      depth: z.coerce.number().min(15).max(20),
      move: z.string(),
    })
  }
}
