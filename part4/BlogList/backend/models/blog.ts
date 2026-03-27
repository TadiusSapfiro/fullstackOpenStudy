import mongoose from 'mongoose'

mongoose.set('strictQuery', true)
interface blogDB  {
  title: string,
  author: string,
  url: string,
  likes: number,
}

const blogSchema = new mongoose.Schema<blogDB>({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject:Record<string, any>) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

export const Blog = mongoose.model('Blog', blogSchema)

