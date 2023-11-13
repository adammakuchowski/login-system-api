import {NextFunction, Request, Response} from 'express'

import {logger} from '../../app'
import {
  comparePassword,
  createUser,
  createWebToken,
  getUserByEmail,
  hashPassword,
} from '../services/authService'
import {canCreateDocument} from '../../db/mongoUtils'
import User from '../../db/models/User'
import appConfig from '../../configs/appConfig'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {email, password} = req.body
    const {database: {userLimit}} = appConfig

    const canCreate = await canCreateDocument(User, userLimit)
    if (!canCreate) {
      throw new Error('Limit of user documents reached.')
    }

    //TODO: Regex to email validation 

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      logger.warn(`[registerUser]: user with this email ${email} already exists`)

      return res
        .status(400)
        .json({message: 'A user with this email already exists.'})
    }

    const hash = await hashPassword(password)
    await createUser(email, hash)

    res
      .status(201)
      .json({message: 'The user has been successfully registered.'})
  } catch (error) {
    logger.error('A server error occurred during user registration.')

    next(error)
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {email, password} = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      logger.warn(`[loginUser]: user with this email ${email} does not exists`)

      return res
        .status(401)
        .json({message: 'Invalid login details.'})
    }

    const passwordMatch = await comparePassword(password, user.password)
    if (!passwordMatch) {
      logger.warn(`[loginUser]: incorrect password`)

      return res
        .status(401)
        .json({message: 'Invalid login details.'})
    }

    const {id} = user
    const token = await createWebToken(id)

    res
      .status(200)
      .json({token})
  } catch (error: any) {
    logger.error('A server error occurred during user login.')

    next(error)
  }
}

export const verifyUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info('[verifyUser]: user verified')

    res
      .status(200)
      .json({
        message: 'Token verification successful',
      })
  } catch (error: any) {
    next(error)
  }
}
