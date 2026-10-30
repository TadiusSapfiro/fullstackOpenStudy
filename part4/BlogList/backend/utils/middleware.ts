import type { Request, Response, NextFunction } from 'express'
import logger from './logger'

const unknownEndpoint = (request:Request, response:Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error:any, request:Request, response:Response, next:NextFunction) => {
  logger.error(`error caught: ${error.message}`)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Unknown format ID' })
  } else if (error.name === 'ValidationError') {
    const firstValidationError = Object.values(error.errors)[0] as any
    const errorMessage = firstValidationError.message
    return response.status(400).json({ error: errorMessage })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'token invalid'
    })
  }else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

export default { unknownEndpoint, errorHandler }