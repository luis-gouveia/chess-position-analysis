export abstract class BaseError extends Error {
  readonly data?: any

  public constructor(message: string, data?: any) {
    super(message)
    this.data = data
  }
}
