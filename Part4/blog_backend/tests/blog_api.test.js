const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(helper.initialUser.password, 10)
  const user = new User({
    username: helper.initialUser.username,
    name: helper.initialUser.username,
    blogs: [],
    passwordHash })

  await user.save()

  await Blog.deleteMany({})

  const users = await User.find({})
  const firstUser = users[0]

  const blogObjects = helper.initialBlogs.map(blog => new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes || 0,
    user: firstUser._id
  }))

  const promiseArray = blogObjects.map(blog => {
    blog.save()
    firstUser.blogs = firstUser.blogs.concat(blog._id)
  })
  await Promise.all(promiseArray)
  await firstUser.save()
})

test('blogs are returned JSON Ex 4.8', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},10000)

test('ALL BLOGS are returned Ex. 4.8', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
},10000)

test('unique identifier is named ID Ex 4.9', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

describe('addition of a new blog', () => {
  let token

  beforeEach ( async () => {
    const loggedUser = await api.post('/api/login').send(helper.initialUser)
    token = loggedUser.body.token
  })

  test('NEW BLOG can be added Ex 4.10', async () => {

    const newBlog =   {
      title:'new test t1',
      author:'new test a1',
      url:'new test u1',
      likes:'42'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const urls = updatedBlogs.map(blog => blog.url)
    expect(urls).toContain('new test u1')
  },10000)

  test('NEW BLOG cannot be added without token response 401 Ex 4.23', async () => {

    const newBlog =   {
      title:'new test w/o token',
      author:'new test w/o token author',
      url:'new test w/o token author',
      likes:'421'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs).toHaveLength(helper.initialBlogs.length)

    const urls = updatedBlogs.map(blog => blog.url)
    expect(urls).not.toContain('new test w/o token')
  },10000)

  test('NEW BLOG cannot be added with invalid token response 401 Ex 4.23', async () => {
    token = token.concat('qwert')
    const newBlog =   {
      title:'new test with invalid token',
      author:'new test with invalid token author',
      url:'new test with invalid token  author',
      likes:'421'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs).toHaveLength(helper.initialBlogs.length)

    const urls = updatedBlogs.map(blog => blog.url)
    expect(urls).not.toContain('new test with invalid token')
  },10000)

  test('MISSING LIKES property in request, will be equal 0 by default Ex 4.11', async () => {
    const usersInDb = await helper.usersInDb()
    const user = usersInDb[0]

    const newBlog =   {
      title:'new test t2',
      author:'new test a2',
      url:'new test u2',
      userId: user.id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(newBlog.likes).not.toBeDefined()

    const updatedBlogs = await helper.blogsInDb()
    const newBlogInDb = updatedBlogs.find(blog => blog.title === 'new test t2')
    expect(newBlogInDb.likes).toEqual(0)
  },10000)

  test('MISSING TITLE OR URL property in request, will cause of response 400 Ex 4.12', async () => {
    const usersInDb = await helper.usersInDb()
    const user = usersInDb[0]

    const blogWithOutTitle =   {
      author:'new test a3',
      url:'new test u3',
      likes:'42',
      userId: user.id
    }

    const blogWithOutUrl =   {
      title:'new test t4',
      author:'new test a4',
      likes:'42',
      userId: user.id
    }

    await api
      .post('/api/blogs')
      .send(blogWithOutTitle)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(blogWithOutUrl)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    let updatedBlogs = await helper.blogsInDb()

    expect(blogWithOutTitle.title).not.toBeDefined()
    const urls = updatedBlogs.map(blog => blog.url)
    expect(urls).not.toContain(blogWithOutTitle.url)

    expect(blogWithOutUrl.url).not.toBeDefined()
    const titles = updatedBlogs.map(blog => blog.title)
    expect(titles).not.toContain(blogWithOutUrl.title)
  },10000)
})

describe('DELetion of a blog Ex 4.13', () => {
  let token

  beforeEach ( async () => {
    const loggedUser = await api.post('/api/login').send(helper.initialUser)
    token = loggedUser.body.token
  })

  test('succeed with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]


    await api // valid existing id
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .set('Authorization', `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const urls = blogsAtEnd.map(blog => blog.url)

    expect(urls).not.toContain(blogToDelete.url)
  },10000)


  test('fail with status code 401 if id is valid, but doesn\'t exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api // valid UNexisting id
      .delete(`/api/blogs/${validNonExistingId}`)
      .expect(401)
      .set('Authorization', `Bearer ${token}`)

  },10000)

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da590'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]
    blogToView.user = blogToView.user.toString()

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da590'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('UPDate a specific blog Ex 4.14', () => {
  let token

  beforeEach ( async () => {
    const loggedUser = await api.post('/api/login').send(helper.initialUser)
    token = loggedUser.body.token
  })

  test('blog update', async () => {
    const blogUpdate =   {
      title:'test title upd',
      author:'test author upd',
      url:'test url upd',
      likes:111
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogUpdate)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    delete resultBlog.body.id
    delete resultBlog.body.user

    expect(resultBlog.body).toEqual(blogUpdate)
  })

  test('likes update', async () => {
    const likesUpdate =   {
      likes:42
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(likesUpdate)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.likes).toEqual(likesUpdate.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})