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