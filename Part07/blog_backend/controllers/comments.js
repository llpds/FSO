const commentRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')


commentRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

commentRouter.get('/:id/allComments', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments)
})

commentRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const comment = new Comment({
    content: body.content
  })

  const blog = await Blog.findById(request.params.id)

  if(!blog) response.status(401).json({ error: 'This blog id doesn\'t exist' })

  comment.blog = blog.id
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  const populatedBlog = await Blog.findById(request.params.id).populate('comments').populate('user')

  savedComment.blog = populatedBlog
  response.status(201).json(savedComment)
})



module.exports = commentRouter