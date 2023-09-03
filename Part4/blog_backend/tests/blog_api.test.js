const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

afterAll(async () => {
  await mongoose.connection.close()
})


test('notes are returned JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('ALL NOTES are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('unique identifier is named ID', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})


test('NEW BLOG can be added', async () => {
  const newBlog =   {
    title:'new test t1',
    author:'new test a1',
    url:'new test u1',
    likes:'42'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await helper.blogsInDb()
  expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1)

  const urls = updatedBlogs.map(blog => blog.url)
  expect(urls).toContain('new test u1')
})

test('MISSING LIKES property in request, will be equal 0 by default', async () => {
  const newBlog =   {
    title:'new test t2',
    author:'new test a2',
    url:'new test u2'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(newBlog.likes).not.toBeDefined()

  const updatedBlogs = await helper.blogsInDb()
  const newBlogInDb = updatedBlogs.find(blog => blog.title === 'new test t2')
  expect(newBlogInDb.likes).toEqual(0)
})

test('MISSING TITLE OR URL property in request, will cause of response 400', async () => {
  const blogWithOutTitle =   {
    author:'new test a3',
    url:'new test u3',
    likes:'42'
  }

  const blogWithOutUrl =   {
    title:'new test t4',
    author:'new test a4',
    likes:'42'
  }

  await api
    .post('/api/blogs')
    .send(blogWithOutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blogWithOutUrl)
    .expect(400)

  let updatedBlogs = await helper.blogsInDb()

  expect(blogWithOutTitle.title).not.toBeDefined()
  const urls = updatedBlogs.map(blog => blog.url)
  expect(urls).not.toContain(blogWithOutTitle.url)


  expect(blogWithOutUrl.url).not.toBeDefined()
  const titles = updatedBlogs.map(blog => blog.title)
  expect(titles).not.toContain(blogWithOutUrl.title)
})