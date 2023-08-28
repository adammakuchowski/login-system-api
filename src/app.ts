import express, {
  Request,
  Response,
} from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import winston from 'winston'
import notFound from './middlewares/notFoundHandler'
import errorHandler from './middlewares/errorHandler'
import userRouter from './api/routes/userRouter'
import corsOptions from './configs/corsConfig'
import loggerConfig from './configs/winstonConfig'
import {connectDB} from './db/db'

export const logger = winston.createLogger(loggerConfig)

connectDB()
const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req: Request, res: Response): void => {
  res.send('Every day you must ask yourself: Did you do enough?')
})

app.use('/user', userRouter)

app.use(notFound)
app.use(errorHandler)

export default app
