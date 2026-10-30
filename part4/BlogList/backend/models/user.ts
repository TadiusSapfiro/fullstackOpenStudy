import mongoose from 'mongoose'
import { UserDB } from '../types'
const userSchema = new mongoose.Schema<UserDB>({
  username: {
    type: String,
    minlength : [3, 'Username must be at least 3 characters long'],
    required: [true, 'Username is required'],
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
  ],
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject:Record<string, any>) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export const User = mongoose.model('User', userSchema)