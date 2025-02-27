import express from 'express'
import { positionAnalysisController, positionAnalysisRequestSchema } from '../controllers/positionAnalysis'
import { validator } from '../shared/middleware/RequestParametersValidator'
import { moveAnalysisController, moveAnalysisRequestSchema } from '../controllers/moveAnalysis'

const analysisRoute = express.Router()

analysisRoute.get('/position', validator(positionAnalysisRequestSchema.get()), (req, res) =>
  positionAnalysisController.execute(req as any, res),
)
analysisRoute.get('/move', validator(moveAnalysisRequestSchema.get()), (req, res) =>
  moveAnalysisController.execute(req as any, res),
)

export default analysisRoute
