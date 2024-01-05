import mongoose, {Document} from 'mongoose'

export interface UserDocument extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {type: String, required: true}
}, {
  timestamps: true
})

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
