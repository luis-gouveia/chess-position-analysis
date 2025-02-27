import openings from '../resources/openings.json'

export function getOpening(fen: string): string | undefined {
  const op = openings as Record<string, { name: string }>
  return op[fen]?.name

  //if (!(fen in Object.keys(openings))) return
  //return openings[fen].name
}
