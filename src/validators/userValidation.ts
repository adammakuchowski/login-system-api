import Joi from 'joi'
import {User} from '../interfaces/types'

export const userSchema = Joi.object<User>({
  email: Joi.string().required(),
  password: Joi.string().required(),
})
