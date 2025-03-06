import request from 'supertest'
import startServer from '../src/server'
import { Express } from 'express'
import { ConfigUtils } from '../src/shared/utils/ConfigUtils'

describe('MoveAnalysis', () => {
  let server: Express
  beforeAll(() => {
    const { baseRoute } = ConfigUtils.get('server')
    server = startServer(baseRoute)
  })

  test('Should fail if an invalid fen is provided', async () => {
    const response = await request(server).get('/analysis/move').query({
      fen: 'invalid-fen',
      move: 'e4',
      depth: 20,
    })
    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('The provided FEN string is not valid.')
  })

  test('Should fail if an invalid depth is provided', async () => {
    const response = await request(server)
      .get('/analysis/move')
      .query({
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        move: 'e4',
        depth: ConfigUtils.get('analysis.maxDepth') + 10,
      })
    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Invalid request data.')
    expect(response.body.data[0].argument).toEqual('depth')
  })

  test('Should fail if an invalid move is provided', async () => {
    const response = await request(server).get('/analysis/move').query({
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      depth: 20,
      move: 'invalid-move',
    })
    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('The provided move is not valid.')
  })

  test('Should be able to analyse if the provided game already ended', async () => {
    const response = await request(server).get('/analysis/move').query({
      fen: '4k2R/6Q1/8/8/8/8/8/3K4 b - - 0 1',
      move: 'e4',
      depth: 20,
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body.data.evaluation).toEqual('1-0')
    expect(response.body.data.bestMove).toBeUndefined()
    expect(response.body.data.classification).toBeUndefined()
    expect(response.body.data.opening).toBeUndefined()
  })

  test('Should be able to analyse a move with valid input data', async () => {
    const response = await request(server).get('/analysis/move').query({
      fen: '8/6Q1/7R/1k6/8/8/8/3K4 b - - 0 1',
      move: 'Kc4',
      depth: 20,
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body.data.bestMove).toBeDefined()
    expect(response.body.data.evaluation).toBeDefined()
    expect(response.body.data.classification).toBeDefined()
    expect(response.body.data.opening).toBeUndefined()
  })

  test('Should be able to analyse a move that is a checkmate', async () => {
    const response = await request(server).get('/analysis/move').query({
      fen: '4k3/6Q1/7R/8/8/8/8/3K4 w - - 0 1',
      move: 'Rh8',
      depth: 20,
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body.data.bestMove).toBeDefined()
    expect(response.body.data.evaluation).toEqual('1-0')
    expect(response.body.data.classification).toEqual('BEST')
    expect(response.body.data.opening).toBeUndefined()
  })

  test('Should be able to analyse a move that resulted in a stalemate', async () => {
    const response = await request(server).get('/analysis/move').query({
      fen: '4k3/6Q1/5Q1R/8/8/8/8/2K5 w - - 1 2',
      move: 'Rh7',
      depth: 20,
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body.data.bestMove).toBeDefined()
    expect(response.body.data.evaluation).toEqual('1/2-1/2')
    expect(response.body.data.classification).toEqual('MISTAKE')
    expect(response.body.data.opening).toBeUndefined()
  })

  test('Should be able to analyse a book move', async () => {
    const response = await request(server).get('/analysis/move').query({
      fen: 'rnbqkbnr/pppp1ppp/8/4p3/8/6P1/PPPPPP1P/RNBQKBNR w KQkq - 0 2',
      move: 'a3',
      depth: 20,
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body.data.bestMove).toBeDefined()
    expect(response.body.data.evaluation).toBeDefined()
    expect(response.body.data.classification).toEqual('BOOK')
    expect(response.body.data.opening).toEqual('Benko Opening')
  })
})
