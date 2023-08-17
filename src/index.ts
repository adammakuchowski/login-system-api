import createApp, {logger} from './app'
import appConfig from './configs/appConfig'
import {connectDB} from './db/db'

const startApp = async () => {
  try {
    const {port} = appConfig 
    
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
