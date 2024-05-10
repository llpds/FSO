const _ = require('lodash')

const dummy = (blogs) => {
  if (blogs) return 1
}
const totalLikes = (blogs) => blogs.reduce((acc, val) => acc + val.likes, 0)

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((acc, val) => acc = acc.likes < val.likes ? val : acc)

  delete blog.__v
  delete blog._id
  delete blog.url
  return blog
}

const mostBlog = (blogs) => {
  let authors = {}
  _.each(blogs, (blog) => {
    const name = blog.author
    authors[name] = authors[name] ? authors[name] + 1 : 1
  })

  const mostBlogArr = _.maxBy(Object.entries(authors), (a) => a[1])

  return {
    author: mostBlogArr[0],
    blogs: mostBlogArr[1]
  }
}

const mostLikes = (blogs) => {
  let authors = {}
  _.each(blogs, (blog) => {
    const name = blog.author
    authors[name] = authors[name] ? authors[name] + blog.likes : blog.likes
  })

  const mostLikesArr = _.maxBy(Object.entries(authors), (a) => a[1])

  return {
    author: mostLikesArr[0],
    likes: mostLikesArr[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}