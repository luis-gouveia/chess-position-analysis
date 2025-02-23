import { ControllerError } from '../../shared/errors/ControllerError'
import { PositionAnalysisController } from './PositionAnalysis'

export class InvalidFEN extends ControllerError {
  constructor() {
    super('The provided FEN string is not valid.', PositionAnalysisController.name)
  }
}

export class GameAlreadyOver extends ControllerError {
  constructor() {
    super('The provided FEN corresponds to a game that already ended.', PositionAnalysisController.name)
  }
}
