import { Request, Response } from 'express'
import { BaseError } from '../errors/BaseError'
import { logger } from '../logger'

export interface RequestDTO<Query, Body> {
  query: Query
  body: Body
}

type ControllerResponse<T> = { data: T } | { error: string; data?: any }

export abstract class BaseController<RequestQueryDTO, RequestBodyDTO, ResponseDTO> {
  readonly name: string

  constructor(name: string) {
    this.name = name
  }

  protected abstract executeController(request: RequestDTO<RequestQueryDTO, RequestBodyDTO>): Promise<ResponseDTO>

  public async execute(
    request: Request<unknown, unknown, RequestBodyDTO, RequestQueryDTO>,
    response: Response<ControllerResponse<ResponseDTO>>,
  ): Promise<void> {
    const start = Date.now()
    logger.info(`Executing ${this.name}`)

    try {
      const result = await this.executeController({ query: request.query, body: request.body })

      const executionTime = Date.now() - start
      logger.info(`${this.name} executed successfully in ${executionTime}ms`)

      response.status(200).json({ data: result })
    } catch (error: any) {
      const executionTime = Date.now() - start
      logger.error(`${this.name} execution finished with errors in ${executionTime}ms`, error)

      if (error instanceof BaseError) {
        response.status(400).json({ error: error.message })
      } else {
        response.status(500).json({ error: error.message })
      }
    }
  }
}
