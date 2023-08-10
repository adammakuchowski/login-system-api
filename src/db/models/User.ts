import mongoose from 'mongoose'
import {User} from '../../interfaces/types'

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

const User = mongoose.model<User>('User', userSchema)

export default User
