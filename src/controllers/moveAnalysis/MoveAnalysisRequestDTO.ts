import { z, ZodObject, ZodTypeAny } from 'zod'
import { BaseValidatorSchema } from '../../shared/middleware/RequestParametersValidator'
import { ConfigUtils } from '../../shared/utils/ConfigUtils'

export interface MoveAnalysisRequestDTO {
  fen: string
  depth: number
  move: string
}

export class MoveAnalysisRequestSchema implements BaseValidatorSchema<MoveAnalysisRequestDTO> {
  public get(): ZodObject<Record<keyof MoveAnalysisRequestDTO, ZodTypeAny>> {
    return z.object({
      fen: z.string(),
      depth: z.coerce.number().min(ConfigUtils.get('analysis.minDepth')).max(ConfigUtils.get('analysis.maxDepth')),
      move: z.string(),
    })
  }
}
