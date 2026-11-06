import express from 'express'
import { Blog } from '../models/blog'
import type { Request, Response } from 'express'
import middleware from '../utils/middleware'



const blogsRouter = express.Router()

blogsRouter.get('/', async (request: Request, response:Response) => {
  const blogList = await Blog.find({}).populate('user', { username:1, name:1 })
  return response.json(blogList)
})

blogsRouter.post('/', middleware.userExtractor, async (request: Request, response:Response) => {

  const user = request.user!

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

blogsRouter.delete('/:id', middleware.userExtractor, async (request: Request, response:Response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user!
  if(!blog) {
    return response.status(204).end()
  }

  if ( blog.user.toString() !== user._id.toString() ){
    return response.status(401).json({ error: 'only the user who created the blog can delete it' })
  }
  await blog.deleteOne()
  user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
  await user.save()
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