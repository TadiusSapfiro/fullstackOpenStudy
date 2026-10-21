import 'dotenv/config'
import logger from './logger'


export const MONGODB_URI = process.env.MONGODB_URI as string
if(!MONGODB_URI){
  logger.info('CRITICAL ERROR: MONGODB_URI not found!')
}
if (!process.env.SECRET) {
  throw new Error('SECRET environment variable is not defined')
}
export const SECRET: string = process.env.SECRET

export const PORT = process.env.PORT || 3003