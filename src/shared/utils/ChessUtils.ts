import { Chess } from 'chess.js'

export abstract class ChessUtils {
  public static convertToSan(fen: string, move: string): string {
    const game = new Chess(fen)
    return game.move(move).san
  }

  public static convertToLan(fen: string, move: string): string {
    const game = new Chess(fen)
    return game.move(move).lan
  }
}
