import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { MONGODB_URI } from './utils/config'
import blogsRouter from './controllers/blog'
import logger from './utils/logger'

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

export default app
