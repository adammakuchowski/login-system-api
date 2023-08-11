import bcrypt from 'bcrypt'
import User from '../../db/models/User'

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await User.findOne({email})

    return existingUser
  } catch (error) {
    throw new Error('An error occurred while checking the existence of the user.')
  }
}

export const createUser = async (email: string, hashedPassword: string) => {
  try {
    const newUser = new User({email, hashedPassword})
    await newUser.save()
  } catch (error) {
    throw new Error('An error occurred during user registration.')
  }
}

export const hashPassword = async (password: string, saltOrRounds: string | number) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)

    return hashedPassword
  } catch (error) {
    throw new Error('An error occurred while hashing the password.')
  }
}
