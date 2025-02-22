export class ConfigNotSetError extends Error {
  readonly cause: unknown

  public constructor(config: string) {
    super(`No value set for config "${config}".`)
  }
}
