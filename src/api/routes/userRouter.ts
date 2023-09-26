import express from 'express'
import passport from 'passport'

import {registerUser, loginUser} from '../controllers/userController'
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
  passport.authenticate('local', {session: false}),
  loginUser,
)

export default router
