import bcrypt from 'bcrypt'
import {logger} from '../../app'
import User from '../../db/models/User'

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await User.findOne({email})

    return existingUser
  } catch (error: any) {
    logger.error(`[getUserByEmail]: ${error.message}`)
    throw new Error('An error occurred while checking the existence of the user.')
  }
}

export const createUser = async (email: string, hashedPassword: string) => {
  try {
    const newUser = new User({email, password: hashedPassword})
    await newUser.save()

    logger.info(`[createUser]: user with email ${email} saved`)
  } catch (error: any) {
    logger.error(`[createUser]: ${error.message}`)
    throw new Error('An error occurred during user registration.')
  }
}

export const hashPassword = async (password: string, saltOrRounds: string | number) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)

    return hashedPassword
  } catch (error: any) {
    logger.error(`[hashPassword]: ${error.message}`)
    throw new Error('An error occurred while hashing the password.')
  }
}
