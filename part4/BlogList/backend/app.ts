import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/config'
import blogsRouter from './controllers/blog'
import usersRouter from './controllers/user'
import loginRouter from './controllers/login'
import logger from './utils/logger'
import middleware from './utils/middleware'

const app = express()
if(process.env.NODE_ENV !== 'test'){
  mongoose
    .connect(MONGODB_URI, { family: 4 })
    .then(() => {
      logger.info('Successful connection to MongoDB')
    })
    .catch((error) => {
      logger.error(error)
      logger.info(`Failed connection to MongoDB: ${error.message}`)
    })
}



app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
