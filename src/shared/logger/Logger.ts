export class Logger {
  private readonly enabled: boolean

  constructor(enabled: boolean) {
    this.enabled = enabled
  }

  private getFormattedDate(): string {
    const date = new Date()
    return `${date
      .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', weekday: 'short' })
      .split(',')
      .join('')} ${date.toLocaleTimeString()}`
  }

  public info(message: string) {
    if (this.enabled) {
      console.log(`[${this.getFormattedDate()}] [INFO] ${message}`)
    }
  }

  public error(message: string, error?: Error) {
    if (this.enabled) {
      console.log(`[${this.getFormattedDate()}] [ERROR] ${message}`)
      if (error) console.error(error)
    }
  }
}
