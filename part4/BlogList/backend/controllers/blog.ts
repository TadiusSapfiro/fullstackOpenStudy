import express from 'express'
import { Blog } from '../models/blog'
import type { Request, Response } from 'express'



const blogsRouter = express.Router()

blogsRouter.get('/', async (request: Request, response:Response) => {
  const blogList = await Blog.find({})
  return response.json(blogList)
})

blogsRouter.post('/', async (request: Request, response:Response) => {
  const newBlog = request.body
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request: Request, response:Response) => {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

export default blogsRouter