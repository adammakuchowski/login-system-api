import express from 'express'
import {registerUser, loginUser} from '../controllers/userController'
import {validationRequest} from '../../middlewares/validationRequest'
import {userSchema} from '../../validators/userValidation'

const router = express.Router()

router.post('/register', validationRequest(userSchema), registerUser)

router.post('/login', loginUser)

export default router
