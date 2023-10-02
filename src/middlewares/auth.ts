import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

import appConfig from '../configs/appConfig'

export const authenticateToken = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const token = req.header('Authorization')
  const { authorization: { secretKey } } = appConfig

  if (!token) {
    return res.status(401).json({ message: 'Access denied - missing JWT token.' })
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid JWT token.' })
    }
    req.user = user
    next()
  })
}
