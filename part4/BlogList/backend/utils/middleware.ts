import type { Request, Response, NextFunction } from 'express'
import logger from './logger'

const unknownEndpoint = (request:Request, result:Response) => {
  result.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error:any, request:Request, result:Response, next:NextFunction) => {
  logger.error(`error caught: ${error.message}`)
  if (error.name === 'CastError') {
    return result.status(400).send({ error: 'Unknown format ID' })
  } else if (error.name === 'ValidationError') {
    const firstValidationError = Object.values(error.errors)[0] as any
    const errorMessage = firstValidationError.message
    console.log(errorMessage)
    return result.status(400).json({ error: errorMessage })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return result.status(400).json({ error: 'expected `username` to be unique' })
  }
  next(error)
}

export default { unknownEndpoint, errorHandler }