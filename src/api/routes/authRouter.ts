import express from 'express'

import {registerUser, loginUser, test} from '../controllers/authController'
import {validationRequest} from '../../middlewares/validationRequest'
import {authenticateToken} from '../../middlewares/auth'
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

router.get(
  '/test',
  authenticateToken,
  test,
)

export default router
