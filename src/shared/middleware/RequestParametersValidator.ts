import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError, ZodObject, ZodTypeAny } from 'zod'

export interface BaseValidatorSchema<Input> {
  get(): ZodObject<Record<keyof Input, ZodTypeAny>>
}

export class RequestParameterValidator {
  public validate(validator: AnyZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        validator.parse(req.query)
        next()
      } catch (error: any) {
        if (error instanceof ZodError) {
          const errorMessages = error.errors.map((issue: any) => ({
            argument: issue.path.join('.'),
            message: issue.message,
          }))
          res.status(400).json({ error: 'Invalid request data.', data: errorMessages })
        } else {
          res.status(500).json({ error: 'Internal Server Error.' })
        }
      }
    }
  }
}
