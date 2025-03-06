import { ControllerError } from '../../shared/errors/ControllerError'
import { MoveAnalysisController } from './MoveAnalysis'

export class InvalidFEN extends ControllerError {
  constructor() {
    super('The provided FEN string is not valid.', MoveAnalysisController.name)
  }
}

export class InvalidMove extends ControllerError {
  constructor() {
    super('The provided move is not valid.', MoveAnalysisController.name)
  }
}
