import request from 'supertest'
import startServer from '../src/server'
import { Express } from 'express'
import { ConfigUtils } from '../src/shared/utils/ConfigUtils'

describe('PositionAnalysis', () => {
  let server: Express
  beforeAll(() => {
    const { baseRoute } = ConfigUtils.get('server')
    server = startServer(baseRoute)
  })

  test('Should fail if an invalid fen is provided', async () => {
    const response = await request(server).get('/analysis/position').query({
      fen: 'invalid-fen',
      depth: 20,
    })
    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('The provided FEN string is not valid.')
  })

  test('Should fail if an invalid depth is provided', async () => {
    const response = await request(server)
      .get('/analysis/position')
      .query({
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        depth: ConfigUtils.get('analysis.maxDepth') + 10,
      })
    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Invalid request data.')
    expect(response.body.data[0].argument).toEqual('depth')
  })

  test('Should fail if an invalid prespective is provided', async () => {
    const response = await request(server).get('/analysis/position').query({
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      depth: 20,
      prespective: 'invalid-prespective',
    })
    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Invalid request data.')
    expect(response.body.data[0].argument).toEqual('prespective')
  })

  test('Should be able to analyse a game that already ended', async () => {
    const response = await request(server).get('/analysis/position').query({
      fen: '4k2R/6Q1/8/8/8/8/8/3K4 b - - 0 1',
      depth: 20,
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body.data.evaluation).toEqual('1-0')
    expect(response.body.data.bestMove).toBeUndefined()
    expect(response.body.data.opening).toBeUndefined()
  })

  test('Should be able to analyse a position with valid input data', async () => {
    const response = await request(server).get('/analysis/position').query({
      fen: 'rn1qkbnr/ppp2ppp/8/3pp3/5P2/6Pb/PPPPP2P/RNBQKB1R w KQkq - 0 4',
      depth: 20,
      prespective: 'white',
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body.data.bestMove).toBeDefined()
    expect(response.body.data.evaluation).toBeDefined()
    expect(response.body.data.opening).toEqual('Amar Opening: Paris Gambit')
  })
})
