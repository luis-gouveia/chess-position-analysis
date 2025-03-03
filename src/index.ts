import { ConfigUtils } from './shared/utils/ConfigUtils'
import startServer from './server'

const { host, port, baseRoute } = ConfigUtils.get('server')

const server = startServer(baseRoute)

server.listen(port, host, () => {
  console.log(`[ ready ] Server listening at http://${host}:${port}`)
})
