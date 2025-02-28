import { ChessUtils } from './ChessUtils'

describe('ChessUtils', () => {
  const fen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
  const sanMove = 'Nc6'
  const lanMove = 'b8c6'

  test('Should return the move in SAN', () => {
    const san = ChessUtils.convertToSan(fen, lanMove)
    expect(san).toEqual(sanMove)
  })

  test('Should return the move in LAN', () => {
    const lan = ChessUtils.convertToLan(fen, sanMove)
    expect(lan).toEqual(lanMove)
  })
})
