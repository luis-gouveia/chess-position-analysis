import express from 'express'
import { ConfigUtils } from './shared/utils/ConfigUtils'
import { routes } from './routes'

const host = ConfigUtils.get('server.host')
const port = ConfigUtils.get('server.port')

const app = express()
app.use(express.json())
app.use('/api/v1', routes)

app.listen(port, host, () => {
  console.log(`[ ready ] Server listening at http://${host}:${port}`)
})
