import express from 'express'
import { Blog } from '../models/blog'
import { User } from '../models/user'
import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config'
import { UserTokenPayload } from '../types'



const blogsRouter = express.Router()

blogsRouter.get('/', async (request: Request, response:Response) => {
  const blogList = await Blog.find({}).populate('user', { username:1, name:1 })
  return response.json(blogList)
})

blogsRouter.post('/', async (request: Request, response:Response) => {
  const decodedToken = jwt.verify(request.token || '', SECRET) as UserTokenPayload
  if(!decodedToken.id){
    return response.status(401).json({ error: 'invalid token' })
  }
  const user = await User.findById(decodedToken.id)
  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const { title, author, url, likes } = request.body
  const blog = new Blog({
    title,
    author,
    url,
    likes:likes || 0,
    user: user._id

  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request: Request, response:Response) => {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request: Request, response:Response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )
  if (!updatedBlog) {
    return response.status(404).end()
  }

  return response.json(updatedBlog)
})

export default blogsRouter