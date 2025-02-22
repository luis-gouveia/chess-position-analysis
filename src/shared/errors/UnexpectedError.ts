import { BaseError } from './BaseError'

export class UnexpectedError extends BaseError {
  constructor(data: any) {
    super('An unexpected error occured.', data)
  }
}
