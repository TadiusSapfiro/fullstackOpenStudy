import mongoose from 'mongoose'

export interface BlogDB  {
  title: string,
  author: string,
  url: string,
  likes?: number,
}

export interface UserDB {
  username: string,
  name: string,
  passwordHash: string,
  blogs:mongoose.Types.ObjectId[],
}