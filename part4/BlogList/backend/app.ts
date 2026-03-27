import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/config'
import blogsRouter from './controllers/blog'
import logger from './utils/logger'
import middleware from './utils/middleware'

const app = express()

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('Successful connection to MongoDB')
  })
  .catch((error) => {
    logger.error(error)
    logger.info(`Failed connection to MongoDB: ${error.message}`)
  })


app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
