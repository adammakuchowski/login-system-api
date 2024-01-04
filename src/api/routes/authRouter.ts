import express from 'express'
import withAsyncHandler from 'express-async-handler'

import {registerUser, loginUser, verifyUser} from '../controllers/authController'
import {validationRequest} from '../../middlewares/validationRequest'
import {authenticateToken} from '../../middlewares/auth'
import {userSchema} from '../../validators/userValidation'

const router = express.Router()

router.post(
  '/register',
  validationRequest(userSchema),
  withAsyncHandler(registerUser)
)

router.post(
  '/login',
  validationRequest(userSchema),
  withAsyncHandler(loginUser)
)

router.get(
  '/verify',
  authenticateToken,
  verifyUser
)

export default router
