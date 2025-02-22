import { Request, Response } from 'express'
import { Logger } from '../logger/Logger'
import { BaseError } from '../errors/BaseError'
import { UnexpectedError } from '../errors/UnexpectedError'
import { ConfigUtils } from '../utils/ConfigUtils'
import util from 'util'

export abstract class BaseController<ResponseDTO> {
  readonly name: string

  constructor(name: string) {
    this.name = name
  }

  protected abstract executeController(request: Request): Promise<ResponseDTO>

  public async execute(request: Request, response: Response): Promise<void> {
    const start = Date.now()
    Logger.info(`Executing ${this.name}`)

    try {
      const result = await this.executeController(request)

      const executionTime = Date.now() - start
      Logger.info(`${this.name} executed successfully in ${executionTime}ms`)

      response.status(200).json({ data: result })
    } catch (error: any) {
      const executionTime = Date.now() - start
      Logger.error(`${this.name} execution finished with errors in ${executionTime}ms`)

      if (error instanceof BaseError) {
        if (ConfigUtils.get('logger', false).verbose) {
          console.log(util.inspect(error.data, { depth: 5 }))
        }
        response.status(400).json({ error: error.message })
        throw error
      } else {
        response.status(500).json({ error: error.message })
        throw new UnexpectedError(error)
      }
    }
  }
}
