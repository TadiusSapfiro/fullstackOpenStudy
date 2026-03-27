import express from 'express'
import { Blog } from '../models/blog'
import type { Request, Response } from 'express'



const blogsRouter = express.Router()

blogsRouter.get('/', async (request: Request, response:Response) => {
  const blogList = await Blog.find({})
  return response.json(blogList)
})

blogsRouter.post('/', async (request: Request, response:Response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

export default blogsRouter