export class Logger {
  private static getFormattedDate(): string {
    const date = new Date()
    return `${date
      .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', weekday: 'short' })
      .split(',')
      .join('')} ${date.toLocaleTimeString()}`
  }

  public static info(message: string) {
    console.log(`[${this.getFormattedDate()}] [INFO] ${message}`)
  }

  public static error(message: string, error?: Error) {
    console.log(`[${this.getFormattedDate()}] [ERROR] ${message}`)
    if (error) console.error(error)
  }
}
