import express from 'express'

import {registerUser, loginUser} from '../controllers/authController'
import {validationRequest} from '../../middlewares/validationRequest'
import {userSchema} from '../../validators/userValidation'


const router = express.Router()

router.post(
  '/register',
  validationRequest(userSchema),
  registerUser
)

router.post(
  '/login',
  validationRequest(userSchema),
  loginUser,
)

export default router
