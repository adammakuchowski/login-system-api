import mongoose, {ConnectOptions} from 'mongoose'
import config from '../config'

const {database: {host, port, name}} = config 
const DB_URL = `mongodb://${host}:${port}/${name}`

export const connectDB = async (): Promise<void> => {
  const dbOptions: ConnectOptions = {}

  try {
    await mongoose.connect(DB_URL)
    console.log('Connected to MongoDB')
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message)
  }
}
