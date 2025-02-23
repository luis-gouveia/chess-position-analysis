import { BaseError } from './BaseError'

export abstract class ControllerError extends BaseError {
  readonly controller: string

  public constructor(message: string, controller: string) {
    super(message)
    this.controller = controller
  }
}
