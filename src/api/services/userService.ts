import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {logger} from '../../app'
import User from '../../db/models/User'
import appConfig from '../../configs/appConfig'

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await User.findOne({email})

    return existingUser
  } catch (error: any) {
    logger.error(`[getUserByEmail]: ${error.message}`)
    throw new Error('An error occurred while checking the existence of the user.')
  }
}

export const createUser = async (email: string, hash: string) => {
  try {
    const newUser = new User({email, password: hash})
    await newUser.save()

    logger.info(`[createUser]: user with email ${email} created`)
  } catch (error: any) {
    logger.error(`[createUser]: ${error.message}`)
    throw new Error('An error occurred during user registration.')
  }
}

export const hashPassword = async (password: string) => {
  try {
    const {authorization: {saltRounds}} = appConfig

    return bcrypt.hash(password, saltRounds)
  } catch (error: any) {
    logger.error(`[hashPassword]: ${error.message}`)
    throw new Error('An error occurred while hashing the password.')
  }
}

export const comparePassword = async (password: string, userPassword: string) => {
  try {
    return bcrypt.compare(password, userPassword)
  } catch (error: any) {
    logger.error(`[comparePassword]: ${error.message}`)
    throw new Error('An error occurred while compare the user password.')
  }
}

export const createWebToken = async (email: string) => {
  try {
    const {authorization: {secretKey}} = appConfig

    return jwt.sign({email}, secretKey, {expiresIn: '1h'})
  } catch (error: any) {
    logger.error(`[createWebToken]: ${error.message}`)
    throw new Error('An error occurred while create the json web tekon.')
  }
}
