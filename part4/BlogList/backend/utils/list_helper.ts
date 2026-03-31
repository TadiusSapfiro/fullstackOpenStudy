import { BlogDB } from '../types'
export const totalLikes = (blogList:BlogDB[]) => {
  if (!blogList) return 0
  return blogList.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

export const favoriteBlog = (blogList:BlogDB[]) => {
  if (blogList.length === 0) return undefined
  return blogList.reduce((acc, blog) => {
    return blog.likes >= acc.likes ?  blog : acc
  })
}

export const mostBlogs = (blogList:BlogDB[]) => {
  if (blogList.length === 0) return undefined
  const authorsMap = {} as Record<string, number>
  let topAuthor = ''
  let topBlogsQty = 0

  for (let i = 0; i < blogList.length; i++) {
    const blog = blogList[i]
    authorsMap[blog.author] = (authorsMap[blog.author] || 0) + 1

    if(authorsMap[blog.author] > topBlogsQty){
      topAuthor = blog.author
      topBlogsQty = authorsMap[blog.author]
    }
  }

  return {
    author:topAuthor,
    blogs:topBlogsQty
  }

}

export const mostLikes = (blogList:BlogDB[]) => {
  if (blogList.length === 0) return undefined
  const authorsMap = {} as Record<string, number>
  let topAuthor = ''
  let topAuthorsLikes = 0

  for (let i = 0; i < blogList.length; i++) {
    const blog = blogList[i]
    authorsMap[blog.author] = (authorsMap[blog.author] || 0) + blog.likes

    if(authorsMap[blog.author] > topAuthorsLikes){
      topAuthor = blog.author
      topAuthorsLikes = authorsMap[blog.author]
    }
  }

  return {
    author:topAuthor,
    likes:topAuthorsLikes
  }

}