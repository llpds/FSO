const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
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
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body


  // constraints for put updating
  // This is obvious behavior corresponding to creating a new user
  // I don't see the need to issue an error message
  // If necessary use  if(!title.length || title.length < 5) { response.status(404).send({ error: 'User validation failed: title is shorter than the minimum allowed length (5).' })}

  const blog = {
    title: body.title || undefined, //prevents insertion of an empty line
    author: body.author || undefined,
    url: (body.url && body.url.length > 4) ? body.url : undefined, // prevents insertion of lines less than 5 characters
    likes: body.likes || undefined
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.json(updatedBlog)
})

// deleted blogs id is still saved in user.blogs... (((
blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(!blog){
    response.status(401).json({ error: 'This blog id doesn\'t exist' })
  }

  if(!blog.user){
    response.status(401).json({ error: 'And... we have a virgin birth: blog without Creator' })
  }

  if (blog.user.toString() === user.id){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'only user who made the blog record can delete it' })
  }

})

module.exports = blogsRouter