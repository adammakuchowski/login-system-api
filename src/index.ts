import app, {logger} from './app'
import appConfig from './configs/appConfig'

const {port} = appConfig

app.listen(port, () => {
  logger.info(`API is listening on port: ${port}`)
})
