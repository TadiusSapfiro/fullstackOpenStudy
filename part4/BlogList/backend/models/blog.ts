import mongoose from 'mongoose'
import { BlogDB } from '../types'

mongoose.set('strictQuery', true)

const blogSchema = new mongoose.Schema<BlogDB>({
  title: {
    type: String,
    required:[true, 'Title is required']
  },
  author: String,
  url: {
    type: String,
    required:[true, 'URL is required']
  },
  likes: { type:Number,default:0 },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject:Record<string, any>) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Blog = mongoose.model('Blog', blogSchema)

