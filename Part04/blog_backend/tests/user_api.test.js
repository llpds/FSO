const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
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
})

describe('when there is initially one USER in db', () => {

  describe('addition of a new user', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'JSB',
        name: 'Johann Sebastian Bach',
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

    test('creation fails without username or password or their length less than 3 symbols 4.16', async () => {
      const usersAtStart = await helper.usersInDb()

      const userWitoutUsername = {
        name: 'Paul Dirac',
        password: 'salainen',
      }

      const userWithoutPassword = {
        username: 'LiHo',
        name: 'Liam Howlett'
      }

      await api
        .post('/api/users')
        .send(userWitoutUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      await api
        .post('/api/users')
        .send(userWithoutPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/)


      const userWithShortUsername = {
        username: 'un',
        name: 'unnamed',
        password: 'salainen',
      }

      const userWithShortPassword = {
        username: 'shortPass',
        name: 'shortPassword',
        password: 'sa',
      }

      await api
        .post('/api/users')
        .send(userWithShortUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      await api
        .post('/api/users')
        .send(userWithShortPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

  })
})

afterAll(async () => {
  await mongoose.connection.close()
})