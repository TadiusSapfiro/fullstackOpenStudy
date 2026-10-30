import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/user'
import type { Request, Response } from 'express'
import { UserPayload } from '../types'

const usersRouter = express.Router()
usersRouter.post('/', async (request:Request<unknown, unknown, UserPayload>, response:Response) => {

  const { username, name, password } = request.body
  const saltRounds = 10
  if(!password|| password.length < 3){
    return response.status(400).json({ error: 'Password is required and must be at least 3 characters long' })
  }
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({ username, name, passwordHash })
  const savedUser = await newUser.save()
  return response.status(201).json(savedUser)
})

usersRouter.get('/', async (_request:Request, response:Response) => {
  const users = await User.find({}).populate('blogs', { title:1, url:1 })
  return response.status(200).json(users)
})

export default usersRouter