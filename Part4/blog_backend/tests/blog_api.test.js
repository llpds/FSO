const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

afterAll(async () => {
  await mongoose.connection.close()
})


describe('when there is initially some blogs saved', () => {
  test('blogs are returned JSON Ex 4.8', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  },10000)

  test('ALL NOTES are returned Ex. 4.8', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  },10000)

  test('unique identifier is named ID Ex 4.9', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('addition of a new blog', () => {
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
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const updatedBlogs = await helper.blogsInDb()
      expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1)

      const urls = updatedBlogs.map(blog => blog.url)
      expect(urls).toContain('new test u1')
    },10000)

    test('MISSING LIKES property in request, will be equal 0 by default Ex 4.11', async () => {
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
    },10000)

    test('MISSING TITLE OR URL property in request, will cause of response 400 Ex 4.12', async () => {
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

      // I changed the code status to 404 to use "express-async-errors"
      // in this case api returns an error message: "error": "Blog validation failed: title: Path `title` is required."
      await api
        .post('/api/blogs')
        .send(blogWithOutTitle)
        .expect(404)

      await api
        .post('/api/blogs')
        .send(blogWithOutUrl)
        .expect(404)

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
    test('succeed with status code 204 if id is valid', async () => {
      const validNonExistingId = await helper.nonExistingId()
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api // valid UNexisting id
        .delete(`/api/blogs/${validNonExistingId}`)
        .expect(204)

      await api // valid existing id
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

      const urls = blogsAtEnd.map(blog => blog.url)

      expect(urls).not.toContain(blogToDelete.url)
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
        .expect(200)
        .expect('Content-Type', /application\/json/)

      delete resultBlog.body.id

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
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body.likes).toEqual(likesUpdate.likes)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})
