import createApp from './app'
import config from './config'
import {connectDB} from './db/db'

const startApp = async () => {
  try {
    const {port} = config 
    
    await connectDB()
    const express = createApp()

    express.listen(port, () => {
      console.log(`API is listening on port: ${port}`)
    })
  } catch (error) {
    console.error(error)

    process.exitCode = 1
  }
}

startApp()
