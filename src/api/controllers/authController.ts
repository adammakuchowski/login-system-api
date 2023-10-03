import {Request, Response} from 'express'

import {logger} from '../../app'
import {
  comparePassword,
  createUser,
  createWebToken,
  getUserByEmail,
  hashPassword,
} from '../services/authService'

export const registerUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const {email, password} = req.body

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
    res
      .status(500)
      .json({error: 'A server error occurred during user registration.'})
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
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
    res
      .status(500)
      .json({error: 'A server error occurred during user login.'})
  }
}
