import express, { Request, Response } from 'express'
import { RequestParameterValidator } from './shared/middleware/RequestParametersValidator'
import { positionAnalysisController, positionAnalysisRequestSchema } from './controllers/positionAnalysis'
import { moveAnalysisController, moveAnalysisRequestSchema } from './controllers/moveAnalysis'
import { ConfigUtils } from './shared/utils/ConfigUtils'

const host = ConfigUtils.get('server.host')
const port = ConfigUtils.get('server.port')

const app = express()
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.json({ hello: 'world' })
})

const validator = new RequestParameterValidator().validate
app.post('/analysis/position', validator(positionAnalysisRequestSchema.get()), (req, res) =>
  positionAnalysisController.execute(req as any, res),
)
app.post('/analysis/move', validator(moveAnalysisRequestSchema.get()), (req, res) =>
  moveAnalysisController.execute(req as any, res),
)

app.listen(port, host, () => {
  console.log(`[ ready ] Server listening at http://${host}:${port}`)
})
