import { BlogDB } from '../types'
export const totalLikes = (blogList:BlogDB[]) => {
  if (!blogList) return 0
  return blogList.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}