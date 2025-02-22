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
          console.log(error.errors) // TODO: improve this
          res.status(400).send({ msg: error.issues[0].message })
        } else res.status(500).send('Internal server error')
      }
    }
  }
}
