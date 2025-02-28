import { MoveColor } from '../types/MoveColor'
import { EvaluationUtils } from './EvaluationUtils'

describe('EvaluationUtils', () => {
  test('Should be able to change mate evaluation prespective', () => {
    const evaluation = EvaluationUtils.changeEvaluationPrespective('M1', MoveColor.b, MoveColor.w)
    expect(evaluation).toEqual('M-1')
  })

  test('Should be able to change cp evaluation prespective', () => {
    const evaluation = EvaluationUtils.changeEvaluationPrespective('-20', MoveColor.b, MoveColor.w)
    expect(evaluation).toEqual('20')
  })

  test('Should return same evaluation if prespective is the same as turn', () => {
    const evaluation = EvaluationUtils.changeEvaluationPrespective('M2', MoveColor.b, MoveColor.b)
    expect(evaluation).toEqual('M2')
  })

  test("Should return correct game result for a game didn't end", () => {
    const gameResult = EvaluationUtils.getGameResult('rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2')
    expect(gameResult).toEqual('0-0')
  })

  test('Should return correct game result for a drawn game', () => {
    const gameResult = EvaluationUtils.getGameResult('4k3/6QR/5Q2/8/8/8/8/2K5 b KQkq - 1 2')
    expect(gameResult).toEqual('1/2-1/2')
  })

  test('Should return correct game result when white wins', () => {
    const gameResult = EvaluationUtils.getGameResult('4k1Q1/7R/8/8/8/8/8/2K5 b KQkq - 1 2')
    expect(gameResult).toEqual('1-0')
  })

  test('Should return correct game result when black wins', () => {
    const gameResult = EvaluationUtils.getGameResult('4k3/8/8/8/8/8/6q1/2K4r w KQkq - 1 2')
    expect(gameResult).toEqual('0-1')
  })
})
