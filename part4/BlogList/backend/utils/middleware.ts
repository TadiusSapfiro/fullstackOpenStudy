import type { Request, Response, NextFunction } from 'express'
import logger from './logger'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { SECRET } from './config'
import { UserTokenPayload } from '../types'

const tokenExtractor = (request:Request, response:Response, next:NextFunction) => {

  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  }else{
    request.token = ''
  }
  next()
}

const userExtractor = async (request:Request, response:Response, next:NextFunction) => {
  const decodedToken = jwt.verify(request.token || '', SECRET) as UserTokenPayload
  if(!decodedToken.id){
    return response.status(401).json({ error: 'invalid token' })
  }
  const user = await User.findById(decodedToken.id)
  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  request.user = user
  next()
}



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

export default { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }