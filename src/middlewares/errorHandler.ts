import {NextFunction, Request, Response} from 'express'
import {ErrorResponse} from '../interfaces/errorResponse'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)

  const responseBody = {
    message: err.message,
    stack: err.stack,
  }

  console.error('Error: ', responseBody)
  res.json(responseBody)
}

export default errorHandler
