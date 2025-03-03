import express, { Express } from 'express'
import { routes } from './routes'

export default function startServer(baseRoute: string): Express {
  const server = express()
  server.use(express.json())
  server.use(baseRoute, routes)
  return server
}
