import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { Blog } from './models/blogs'
const mongoUrl = process.env.MONGODB_URI as string

mongoose.connect(mongoUrl, { family: 4 })

const app = express()


app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})