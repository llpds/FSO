const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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

  const user = await User.findById(body.userId)

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  // This part need only for test addition of a new blog / MISSING TITLE OR URL property in request, will cause of response 400 Ex 4.12
  // but this prevents "express-async-errors" from reporting missing title and url

  // if(!body.title || !body.url) {
  //   response.status(400).end()
  // } else {
  //   const savedBlog = await blog.save()
  //   response.status(201).json(savedBlog)
  // }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body


  // constraints for put updating
  const blog = {
    title: body.title || undefined, //prevents insertion of an empty line
    author: body.author || undefined,
    url: (body.url && body.url.length > 4) ? body.url : undefined, // prevents insertion of lines less than 5 characters
    likes: body.likes || undefined
  }


  console.log('blog', blog)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter