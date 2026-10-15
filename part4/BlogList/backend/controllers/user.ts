import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/user'
import type { Request, Response } from 'express'

const usersRouter = express.Router()
usersRouter.post('/', async (request:Request, response:Response) => {

  const { username, name, password }= request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({ username, name, passwordHash })
  const savedUser = await newUser.save()
  return response.status(201).json(savedUser)
})

usersRouter.get('/', async (request:Request, response:Response) => {
  const users = await User.find({})
  return response.status(200).json(users)
})

export default usersRouter