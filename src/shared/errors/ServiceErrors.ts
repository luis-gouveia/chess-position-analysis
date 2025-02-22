import { BaseError } from './BaseError'

export abstract class ServiceError extends BaseError {
  readonly service: string

  public constructor(message: string, data: any, service: string) {
    super(message, data)
    this.service = service
  }
}
