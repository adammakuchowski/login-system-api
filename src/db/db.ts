import mongoose, {ConnectOptions} from 'mongoose'
import config from '../config'
import {logger} from '../app'

const {database: {host, port, name}} = config 
const DB_URL = `mongodb://${host}:${port}/${name}`

export const connectDB = async (): Promise<void> => {
  const dbOptions: ConnectOptions = {}

  try {
    await mongoose.connect(DB_URL)
    logger.info('Connected to MongoDB')
  } catch (error: any) {
    logger.error('Error connecting to MongoDB:', error.message)
  }
}
