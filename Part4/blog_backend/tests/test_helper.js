const Blog = require('../models/blog')

const initialBlogs = [
  {
    title:'loctest t1',
    author:'loctest a1',
    url:'loctest u1'
  },
  {
    title:'loctest t2',
    author:'loctest a2',
    url:'loctest u2'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}