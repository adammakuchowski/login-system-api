import mongoose from 'mongoose'
import {User} from '../../interfaces/types'

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {type: String, required: true},
}, {
  timestamps: true,
})

const User = mongoose.model<User>('User', userSchema)

export default User
