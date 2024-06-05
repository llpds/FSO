# 13 Relational databases

## 13a - Sequelize

  - fly.io

            fly launch

          Would you like to set up a Postgresql database now? YES

          save credentials.

    if you need only database: https://fly.io/docs/postgres/#creating-a-postgres-app

            flyctl postgres connect -a <app_name-db>

  - Docker

            docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres

            docker exec -it CONTAINER_NAME psql -U postgres postgres

  - create
        postgres=#
            \d      show relations
            \d notes
            select * from notes;

            CREATE TABLE notes (
                id SERIAL PRIMARY KEY,
                content text NOT NULL,
                important boolean,
                date time
            );

        SERIAL - integer auto increment unique

            insert into notes (content, important) values ('Relational databases rule the world', true);
            insert into notes (content, important) values ('MongoDB is webscale', false);

      Storing data must be according to the schema or it will cause error

  - Node application using a relational database

            npm install express dotenv pg sequelize

            code index.js

                    require('dotenv').config()
                    const { Sequelize } = require('sequelize')

                    const sequelize = new Sequelize(process.env.DATABASE_URL)

                    const main = async () => {
                      try {
                        await sequelize.authenticate()
                        console.log('Connection has been established successfully.')
                        sequelize.close()
                      } catch (error) {
                        console.error('Unable to connect to the database:', error)
                      }
                    }

                    main()


      in case of fly, need to use tunneling

            flyctl proxy 5432 -a <app-name>-db
            

    first query:
        index.js  

            require('dotenv').config()

            const { Sequelize, QueryTypes } = require('sequelize')
            
            const sequelize = new Sequelize(process.env.DATABASE_URL, {
              dialectOptions: {
                ssl: {
                  require: true,
                  rejectUnauthorized: false
                }
              },
            });
            
            const main = async () => {
              try {
                await sequelize.authenticate()
            
                const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
                console.log(notes)
                sequelize.close()
              } catch (error) {
                console.error('Unable to connect to the database:', error)
              }
            }
            
            main()

      as web app

          index.js

                require('dotenv').config()
                const { Sequelize, QueryTypes } = require('sequelize')

                const express = require('express')
                const app = express()

                const sequelize = new Sequelize(process.env.DATABASE_URL, {
                  dialectOptions: {
                    ssl: {
                      require: true,
                      rejectUnauthorized: false
                    }
                  },
                });


                app.get('/api/notes', async (req, res) => {
                  const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
                  res.json(notes)
                })
                const PORT = process.env.PORT || 3001
                app.listen(PORT, () => {
                  console.log(`Server running on port ${PORT}`)
                })


  - Model

      define model

              const { Sequelize, Model, DataTypes } = require('sequelize')

              class Note extends Model {}
              Note.init({
                id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
                },
                content: {
                  type: DataTypes.TEXT,
                  allowNull: false
                },
                important: {
                    type: DataTypes.BOOLEAN
                },
                date: {
                  type: DataTypes.DATE
                }
              }, {
                sequelize,
                underscored: true,
                timestamps: false,
                modelName: 'note'
              })
  
        then could be used
            await Note.findAll()
            await Note.create(data)           create and save
          or  
            const note = Note.build(data)     create
            note.important = true             change (if need)
            await note.save()                 save


  - create table if not exist (automatically)

        Note.sync()  put after defining a model (Note - just example)

  - Operations

          app.get('/api/notes/:id', async(req, res)=> {
            const note = await Note.findByPk(req.params.id)
            if(note) {
              console.log('note', note.toJSON())
              res.json(note)
            } else {
              res.status(404).end()
            } 
          })

          app.post('/api/notes', async (req, res) => {
            console.log('req.body', req.body)

            try {
              const note = await Note.create(req.body)
              res.json(note)  
            } catch (e){
              return res.status(400).json({e})
            }
          })

          app.put('/api/notes/:id', async (req, res) =>{
            const note = await Note.findByPk(req.params.id)
            if(note){
              note.important = req.body.important
              await note.save()
              res.json(note)
            }else{
              req.status(404).end()
            }
          })


  - Printing object returned by sequelize to the console

          console.log('note', note)    output with unnecessary info
          console.log('note', note.toJSON())    it's ok
        but in case of collection mehod toJSON doesn't work, need use map...
          console.log('notes', notes.map(n => n.toJSON()))
        or
          console.log(JSON.stringify(notes))

## 13b - Join tables and queries
  
  - App structure

      index.js
      util
        config.js
        db.js
      models
        index.js
        note.js
      controllers
        notes.js


    util/config.js

          require('dotenv').config()

          module.exports = {
            DATABASE_URL: process.env.DATABASE_URL,
            PORT: process.env.PORT || 3001,
          }

    index.js

          const express = require('express')
          const app = express()

          const { PORT } = require('./util/config')
          const { connectToDatabase } = require('./util/db')

          const notesRouter = require('./controllers/notes')

          app.use(express.json())

          app.use('/api/notes', notesRouter)

          const start = async () => {
            await connectToDatabase()
            app.listen(PORT, () => {
              console.log(`Server running on port ${PORT}`)
            })
          }

          start()

    util/db.js

          const Sequelize = require('sequelize')
          const { DATABASE_URL } = require('./config')

          const sequelize = new Sequelize(DATABASE_URL)

          const connectToDatabase = async () => {
            try {
              await sequelize.authenticate()
              console.log('connected to the database')
            } catch (err) {
              console.log('failed to connect to the database')
              return process.exit(1)
            }

            return null
          }

          module.exports = { connectToDatabase, sequelize }

    models/note.js

          const { Model, DataTypes } = require('sequelize')

          const { sequelize } = require('../util/db')

          class Note extends Model {}

          Note.init({
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            content: {
              type: DataTypes.TEXT,
              allowNull: false
            },
            important: {
              type: DataTypes.BOOLEAN
            },
            date: {
              type: DataTypes.DATE
            }
          }, {
            sequelize,
            underscored: true,
            timestamps: false,
            modelName: 'note'
          })

          module.exports = Note

    models/index.js

          const Note = require('./note')

          Note.sync()

          module.exports = {
            Note
          }

    controllers/notes.js

          const router = require('express').Router()

          const { Note } = require('../models')

          router.get('/', async (req, res) => {
            const notes = await Note.findAll()
            res.json(notes)
          })

          router.post('/', async (req, res) => {
            try {
              const note = await Note.create(req.body)
              res.json(note)
            } catch(error) {
              return res.status(400).json({ error })
            }
          })

          router.get('/:id', async (req, res) => {
            const note = await Note.findByPk(req.params.id)
            if (note) {
              res.json(note)
            } else {
              res.status(404).end()
            }
          })

          router.delete('/:id', async (req, res) => {
            const note = await Note.findByPk(req.params.id)
            if (note) {
              await note.destroy()
            }
            res.status(204).end()
          })

          router.put('/:id', async (req, res) => {
            const note = await Note.findByPk(req.params.id)
            if (note) {
              note.important = req.body.important
              await note.save()
              res.json(note)
            } else {
              res.status(404).end()
            }
          })

          module.exports = router


    refactor repetitive code into middleware (controllers/notes.js)

          const noteFinder = async (req, res, next) => {
            req.note = await Note.findByPk(req.params.id)
            next()
          }

        in GET, DELETE, PUT where is Note.findByPk... use instead 
          
          router.get (delete or put)('/:id', noteFinder, async (req, res) => ...)

  - User managment

      models/user.js

              const { Model, DataTypes } = require('sequelize')

              const { sequelize } = require('../util/db')

              class User extends Model {}

              User.init({
                id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
                },
                username: {
                  type: DataTypes.STRING,
                  unique: true,
                  allowNull: false
                },
                name: {
                  type: DataTypes.STRING,
                  allowNull: false
                },
              }, {
                sequelize,
                underscored: true,
                timestamps: false,
                modelName: 'user'
              })

              module.exports = User

    models/index.js

              const Note = require('./note')
              const User = require('./user')

              Note.sync()
              User.sync()

              module.exports = { Note, User }

    controllers/users.js 

              const router = require('express').Router()

              const { User } = require('../models')

              router.get('/', async (req, res) => {
                const users = await User.findAll()
                res.json(users)
              })

              router.post('/', async (req, res) => {
                try {
                  const user = await User.create(req.body)
                  res.json(user)
                } catch(error) {
                  return res.status(400).json({ error })
                }
              })

              router.get('/:id', async (req, res) => {
                const user = await User.findByPk(req.params.id)
                if (user) {
                  res.json(user)
                } else {
                  res.status(404).end()
                }
              })

              module.exports = router

    controllers/login.js

              const jwt = require('jsonwebtoken')
              const router = require('express').Router()

              const { SECRET } = require('../util/config')
              const User = require('../models/user')

              router.post('/', async (request, response) => {
                const body = request.body

                const user = await User.findOne({
                  where: {
                    username: body.username
                  }
                })

                const passwordCorrect = body.password === 'secret'

                if (!(user && passwordCorrect)) {
                  return response.status(401).json({
                    error: 'invalid username or password'
                  })
                }

                const userForToken = {
                  username: user.username,
                  id: user.id,
                }

                const token = jwt.sign(userForToken, SECRET)

                response
                  .status(200)
                  .send({ token, username: user.username, name: user.name })
              })

              module.exports = router

    npm install jsonwebtoken

    index.js expands slightly

              const notesRouter = require('./controllers/notes')
              const usersRouter = require('./controllers/users')
              const loginRouter = require('./controllers/login')

              app.use(express.json())

              app.use('/api/notes', notesRouter)
              app.use('/api/users', usersRouter)
              app.use('/api/login', loginRouter)

  - Connection between the tables

    models/index.js

              const Note = require('./note')
              const User = require('./user')

              User.hasMany(Note)
              Note.belongsTo(User)
              Note.sync({ alter: true })
              User.sync({ alter: true })

              module.exports = {
                Note, User
              }

    controllers/notes.js

              router.post('/', async (req, res) => {
                try {
                  const user = await User.findOne()
                  const note = await Note.create({...req.body, userId: user.id})
                  res.json(note)
                } catch(error) {
                  return res.status(400).json({ error })
                }
              })

        userId in the source code due to Sequelize naming convention has wroten as user_id at database level

    controllers/users.js

              router.get('/', async (req, res) => {
                const users = await User.findAll({
                  include: {
                    model: Note
                  }
                })
                res.json(users)
              })

  - Proper insertion of notes

      controllers/notes.js

              const tokenExtractor = (req, res, next) => {
                const authorization = req.get('authorization')
                if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
                  try {
                    req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
                  } catch{
                    return res.status(401).json({ error: 'token invalid' })
                  }
                }  else {
                  return res.status(401).json({ error: 'token missing' })
                }
                next()
              }

              router.post('/', tokenExtractor, async (req, res) => {
                try {
                
                  const user = await User.findByPk(req.decodedToken.id)
                  const note = await Note.create({...req.body, userId: user.id, date: new Date()})
                  res.json(note)
                } catch(error) {
                  return res.status(400).json({ error })
                }
              })

  - Fine-tuning

      controllers/notes.js (show user name instead of userId)

              router.get('/', async (req, res) => {
                const notes = await Note.findAll({
                  attributes: { exclude: ['userId'] },
                  include: {
                    model: User,
                    attributes: ['name']
                  }
                })
                res.json(notes)
              })

      controllers/users.js (remove userId from notes when showing user and his notes)

              router.get('/', async (req, res) => {
                const users = await User.findAll({
                  include: {
                    model: Note,
                    attributes: { exclude: ['userId'] }
                  }
                })
                res.json(users)
              })

  - Attention to the definition of the models

      model/index.js

              User.hasMany(Note)
              Note.belongsTo(User)

      same as in model/note,js

        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        }
