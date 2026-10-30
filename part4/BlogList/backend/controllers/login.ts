import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/user'
import type { Request, Response } from 'express'
import { SECRET } from '../utils/config'

const loginRouter = express.Router()

loginRouter.post('/', async (request: Request, response:Response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  const passwordIsCorrect = (user === null  || !password) ?
    false : await bcrypt.compare(password, user.passwordHash)

  if(!user || !passwordIsCorrect){
    return response.status(401).json({
      error:'invalid username or password' })
  }
  const userForToken = {
    username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60*60 })
  response.status(200).send({
    token,
    username: user.username,
    name: user.name
  })
})

export default loginRouter
