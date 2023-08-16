import createApp, {logger} from './app'
import config from './config'
import {connectDB} from './db/db'

const startApp = async () => {
  try {
    const {port} = config 
    
    await connectDB()
    const express = createApp()

    express.listen(port, () => {
      logger.info(`API is listening on port: ${port}`)
    })
  } catch (error) {
    logger.error(error)

    process.exitCode = 1
  }
}

startApp()
