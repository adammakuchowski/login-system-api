import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {logger} from '../../app'
import UserModel, {UserDocument} from '../../db/models/User'
import appConfig from '../../configs/appConfig'

export const getUserByEmail = async (email: string): Promise<UserDocument | null> => {
  try {
    const existingUser = await UserModel.findOne({email})

    return existingUser
  } catch (error: any) {
    logger.error(`[getUserByEmail]: ${error.message}`)
    throw new Error('An error occurred while checking the existence of the user.')
  }
}

export const createUser = async (email: string, hash: string): Promise<void> => {
  try {
    const newUser = new UserModel({email, password: hash})
    await newUser.save()

    logger.info(`[createUser]: user with email ${email} created`)
  } catch (error: any) {
    logger.error(`[createUser]: ${error.message}`)
    throw new Error('An error occurred during user registration.')
  }
}

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const {authorization: {saltRounds}} = appConfig

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return hashedPassword
  } catch (error: any) {
    logger.error(`[hashPassword]: ${error.message}`)
    throw new Error('An error occurred while hashing the password.')
  }
}

export const comparePassword = async (password: string, userPassword: string): Promise<boolean> => {
  try {
    const compareResulat = await bcrypt.compare(password, userPassword)

    return compareResulat
  } catch (error: any) {
    logger.error(`[comparePassword]: ${error.message}`)
    throw new Error('An error occurred while compare the user password.')
  }
}

export const createWebToken = async (id: string): Promise<string> => {
  try {
    const {authorization: {secretKey}} = appConfig

    return jwt.sign({id}, secretKey, {expiresIn: '1h'})
  } catch (error: any) {
    logger.error(`[createWebToken]: ${error.message}`)
    throw new Error('An error occurred while create the json web tekon.')
  }
}
