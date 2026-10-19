import express from 'express'
import { Blog } from '../models/blog'
import { User } from '../models/user'
import type { Request, Response } from 'express'



const blogsRouter = express.Router()

blogsRouter.get('/', async (request: Request, response:Response) => {
  const blogList = await Blog.find({})
  return response.json(blogList)
})

blogsRouter.post('/', async (request: Request, response:Response) => {
  const user = await User.findById(request.body.userId)
  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  const newBlog = request.body
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()
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