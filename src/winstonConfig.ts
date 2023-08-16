import winston from 'winston'

const loggerConfig = {
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: 'combined.log'})
  ]
}

export default loggerConfig
