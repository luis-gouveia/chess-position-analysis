import { z, ZodObject, ZodTypeAny } from 'zod'
import { BaseValidatorSchema } from '../../shared/middleware/RequestParametersValidator'
import { ConfigUtils } from '../../shared/utils/ConfigUtils'

export interface PositionAnalysisRequestDTO {
  fen: string
  depth: number
}

export class PositionAnalysisRequestSchema implements BaseValidatorSchema<PositionAnalysisRequestDTO> {
  public get(): ZodObject<Record<keyof PositionAnalysisRequestDTO, ZodTypeAny>> {
    return z.object({
      fen: z.string(),
      depth: z.coerce.number().min(ConfigUtils.get('analysis.minDepth')).max(ConfigUtils.get('analysis.maxDepth')),
    })
  }
}
