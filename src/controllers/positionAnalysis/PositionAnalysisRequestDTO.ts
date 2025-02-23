import { z, ZodObject, ZodTypeAny } from 'zod'
import { BaseValidatorSchema } from '../../shared/middleware/RequestParametersValidator'
import { ConfigUtils } from '../../shared/utils/ConfigUtils'
import { MoveColor } from '../../shared/types/MoveColor'

export interface PositionAnalysisRequestDTO {
  fen: string
  depth: number
  prespective?: MoveColor
}

export class PositionAnalysisRequestSchema implements BaseValidatorSchema<PositionAnalysisRequestDTO> {
  public get(): ZodObject<Record<keyof PositionAnalysisRequestDTO, ZodTypeAny>> {
    return z.object({
      fen: z.string(),
      depth: z.coerce.number().min(ConfigUtils.get('analysis.minDepth')).max(ConfigUtils.get('analysis.maxDepth')),
      prespective: z.nativeEnum(MoveColor).optional(),
    })
  }
}
