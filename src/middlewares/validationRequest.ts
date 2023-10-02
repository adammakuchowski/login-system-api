import {Request, Response, NextFunction} from 'express'
import {logger} from '../app'

export const validationRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body)

    if (!req.body) {
      const error = 'Invalid body'

      logger.error(error)
      return res.status(400).json({
        error
      })
    }

    if (result.error) {
      const error = result.error.details[0].message
      
      logger.error(error)
      return res.status(400).json({
        error
      })
    }

    next()
  }
}
