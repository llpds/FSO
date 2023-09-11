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

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'toRemove',
    author: 'toRem',
    url: 'toRemUrl',
    likes: 5
  })
  await blog.save()
  //await blog.remove() // for mongoose version starting from 6.12.00 (marked as DEPRECATED), tested for "mongoose": "^6.8.4"
  await blog.deleteOne() // for mongoose version starting from 7.5.00 (https://mongoosejs.com/docs/api/query.html#Query.prototype.deleteOne()), tested for "mongoose": "^7.4.1"

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}