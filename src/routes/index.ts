import express from 'express'
import analysisRoute from './analysisRoute'

const routes = express.Router()

routes.use('/analysis', analysisRoute)

export { routes }
