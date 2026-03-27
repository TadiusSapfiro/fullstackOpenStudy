import logger from './logger'

export const MONGODB_URI = process.env.MONGODB_URI as string
if(!MONGODB_URI){
  logger.info('CRITICAL ERROR: MONGODB_URI not found!')
}

export const PORT = 3003