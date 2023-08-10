import {Request, Response} from 'express'
import {
  createUser,
  getUserByName,
  hashPassword,
} from '../services/userService'

export const registerUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const {username, password} = req.body

    const existingUser = await getUserByName(username)
    if (existingUser) {
      return res
        .status(400)
        .json({message: 'A user with this name already exists.'})
    }

    const hashedPassword = await hashPassword(password, 10)
    await createUser(username, hashedPassword)

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
