const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user') // delete if no need to delete blogs id from user
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  console.log('blogs', blogs)
  response.json(blogs)
})

blogsRouter.get('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post ('/', async (request, response) => {
  const body = request.body

  if (request.user === null) return response.status(401).json({ error: 'this operation cannot be performed without a token' })
  const user = request.user

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  const savedUser = await user.save()

  savedBlog.user = savedUser
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if(!body.title) { logger.info('if the title does not exist, it will not be updated.')}
  if(!body.url || body.url.length < 5) { logger.info('if the url does not exist or is shorter than required length (5 symbols), it will not be updated.')}

  const blog = {
    title: body.title || undefined, //prevents insertion of an empty line
    author: body.author || undefined,
    url: (body.url && body.url.length > 4) ? body.url : undefined, // prevents insertion of lines less than 5 characters
    likes: body.likes || undefined
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true }).populate('user')
  console.log('updatedBlog', updatedBlog)
  response.json(updatedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if(!user) response.status(401).json({ error: 'invalid user' })
  const blog = await Blog.findById(request.params.id)
  user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id) // delete if no need to delete blogs id from user

  if(!blog) response.status(401).json({ error: 'This blog id doesn\'t exist' })

  if(!blog.user) response.status(401).json({ error: 'And... we have a virgin birth: blog without Creator' })

  if ( blog.user.toString() === user.id){
    await Blog.findByIdAndRemove(request.params.id)
    await User.findByIdAndUpdate(user._id.toString(), user, { new:true }) // delete if no need to delete blogs id from user
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'only user who made the blog record can delete it' })
  }

})

module.exports = blogsRouter