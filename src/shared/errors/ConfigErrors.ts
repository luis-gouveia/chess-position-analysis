import { BaseError } from './BaseError'

export class ConfigNotSetError extends BaseError {
  readonly cause: unknown

  public constructor(config: string) {
    super(`No value set for config "${config}".`)
  }
}

export class InvalidConfigValue extends BaseError {
  public constructor(field: string) {
    super(`Invalid value for ${field}.`)
  }
}
