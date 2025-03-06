import { ControllerError } from '../../shared/errors/ControllerError'
import { PositionAnalysisController } from './PositionAnalysis'

export class InvalidFEN extends ControllerError {
  constructor() {
    super('The provided FEN string is not valid.', PositionAnalysisController.name)
  }
}
