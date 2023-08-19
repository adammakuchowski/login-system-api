import {Request, Response} from 'express'
import {logger} from '../../app'
import {
  createUser,
  getUserByEmail,
  hashPassword,
} from '../services/userService'

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

    const hashedPassword = await hashPassword(password, 10)
    await createUser(email, hashedPassword)

    res.status(201).json({message: 'The user has been registered.'})
  } catch (error) {
    res.status(500).json({error: 'A server error occurred during user registration.'})
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
) => {
  try {

  } catch (error: any) {

  }
}
