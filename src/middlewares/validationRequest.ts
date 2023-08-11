import {Request, Response} from 'express'

export const validationRequest = (schema: any) => {
  return (req: Request, res: Response, next: any) => {
    const result = schema.validate(req.body)

    if (!req.body) {
      const error = 'Invalid body'

      console.error(error)
      return res.status(400).json({
        error
      })
    }

    if (result.error) {
      const error = result.error.details[0].message
      
      console.error(error)
      return res.status(400).json({
        error
      })
    }

    next()
  }
}
