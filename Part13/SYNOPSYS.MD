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

  - More queries

    - defined markers (true, false for example)
      to retrieve all notes with important true or false use 'where' in findAll or other:
        controllers/notes.js
                where: {
                  important: req.query.important === "true"
                }

      both return false (in this case)
          http://localhost:3001/api/notes?important=false
          http://localhost:3001/api/notes  (we assume that here must be all notes, not only with false important)


      this will provide combination of true, false, true & false
                const { Op } = require('sequelize')
                ...
                  let important = {
                    [Op.in]: [true, false]
                  }
                  if ( req.query.important ) {
                    important = req.query.important === "true"
                  }
                ...
                    where: {
                      important
                    }

      but need to prevent null value in field important, models/note.js

                important:{
                  ...
                  allowNull: false,
                }
    
    - search by keyword
        controllers/notes.js

                where: {
                  important,
                  content: {
                    [Op.substring]: req.query.search ? req.query.search : ''
                  }
                }

          GET http://localhost:3001/api/notes?important=true&search=Mongo
          GET http://localhost:3001/api/notes?search=Mongo

    - optimization
        controllers/notes.js

                  const where = {}

                  if (req.query.important) {
                    where.important = req.query.important === "true"
                  }
                
                  if (req.query.search) {
                    where.content = {
                      [Op.substring]: req.query.search
                    }
                  }

                  ...findAll({
                    attributes: ... ,
                    includes: ... ,
                    where   (just where enough)
                  })

      useful link
        Querying - Basics: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
        Operators in "where" : https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators


# 13c - Migrations, many-to-many relationships

  - Migrations - file that describes modifications to a database

      cli: drop table NAMEs;

      migrations/20240606_00_initialize_notes_and_users.js

                const { DataTypes } = require('sequelize')

                module.exports = {
                  up: async ({ context: queryInterface }) => {
                    await queryInterface.createTable('notes', {
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
                        type: DataTypes.BOOLEAN,
                        allowNull: false
                      },
                      date: {
                        type: DataTypes.DATE
                      },
                    })
                    await queryInterface.createTable('users', {
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
                    })
                    await queryInterface.addColumn('notes', 'user_id', {
                      type: DataTypes.INTEGER,
                      allowNull: false,
                      references: { model: 'users', key: 'id' },
                    })
                  },
                  down: async ({ context: queryInterface }) => {
                    await queryInterface.dropTable('notes')
                    await queryInterface.dropTable('users')
                  },
                }

      
      npm install umzug

      util/db.js

                const { Umzug, SequelizeStorage } = require('umzug')
                ...
                const runMigrations = async () => {
                  const migrator = new Umzug({
                    migrations: {
                      glob: 'migrations/*.js',
                    },
                    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
                    context: sequelize.getQueryInterface(),
                    logger: console,
                  })
                  
                  const migrations = await migrator.up()
                  console.log('Migrations up to date', {
                    files: migrations.map((mig) => mig.name),
                  })
                }
                ...
                  try {
                    ...
                    await runMigrations()
                    ...
                  } catch (err) {
                    ...
                    console.log(err)
                    ...
                  }

  - Admin user and user disabling

      migrations/20240607_00_admin_and_disables_to_users.js

              const { DataTypes } = require('sequelize')

              module.exports = {
                up: async ({ context: queryInterface }) => {
                  await queryInterface.addColumn('users', 'admin', {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                  })
                  await queryInterface.addColumn('users', 'disabled', {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                  })
                },
                down: async ({ context: queryInterface }) => {
                  await queryInterface.removeColumn('users', 'admin')
                  await queryInterface.removeColumn('users', 'disabled')
                },
              }

      models/users.js

                ...
                admin:{
                  type: DataTypes.BOOLEAN,
                  defaultValue: false
                },
                disabled:{
                  type: DataTypes.BOOLEAN,
                  defaultValue: false
                },
                ...

      controllers/users.js (only admin can change users disabled)

                const { tokenExtractor } = require('../util/middleware')

                const isAdmin = async (req, res, next) => {
                  const user = await User.findByPk(req.decodedToken.id)
                  if (!user.admin) {
                    return res.status(401).json({ error: 'operation not allowed' })
                  }
                  next()
                }

                router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
                  const user = await User.findOne({
                    where: {
                      username: req.params.username
                    }
                  })

                  if (user) {
                    user.disabled = req.body.disabled
                    await user.save()
                    res.json(user)
                  } else {
                    res.status(404).end()
                  }
                })

      now users status is checked only in login, when user has token it works w/o any verificaions


    - Rollback
        runMigration changes to migrationConf, runMigration, rollbackMigration
        util/db.js

                  const migrationConf = {
                    migrations: {
                      glob: 'migrations/*.js',
                    },
                    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
                    context: sequelize.getQueryInterface(),
                    logger: console,
                  }
                    
                  const runMigrations = async () => {
                    const migrator = new Umzug(migrationConf)
                    const migrations = await migrator.up()
                    console.log('Migrations up to date', {
                      files: migrations.map((mig) => mig.name),
                    })
                  }
                  const rollbackMigration = async () => {
                    await sequelize.authenticate()
                    const migrator = new Umzug(migrationConf)
                    await migrator.down()
                  }

        util/rollback.js

                  const { rollbackMigration } = require('./db')

                  rollbackMigration()


        package.json

                  "migration:down": "node util/rollback.js"

  - Many-to-many relationships

      migrations/20240608_02_add_teams_and_memberships.js

                const { DataTypes } = require('sequelize')

                module.exports = {
                  up: async ({ context: queryInterface }) => {
                    await queryInterface.createTable('teams', {
                      id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                      },
                      name: {
                        type: DataTypes.TEXT,
                        allowNull: false,
                        unique: true
                      },
                    })
                    await queryInterface.createTable('memberships', {
                      id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                      },
                      user_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: { model: 'users', key: 'id' },
                      },
                      team_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: { model: 'teams', key: 'id' },
                      },
                    })
                  },
                  down: async ({ context: queryInterface }) => {
                    await queryInterface.dropTable('teams')
                    await queryInterface.dropTable('memberships')
                  },
                }

      models/team.js

                const { Model, DataTypes } = require('sequelize')

                const { sequelize } = require('../util/db')

                class Team extends Model {}

                Team.init({
                  id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                  },
                  name: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    unique: true
                  },
                }, {
                  sequelize,
                  underscored: true,
                  timestamps: false,
                  modelName: 'team'
                })

                module.exports = Team

      models/membership.js (pivot)

                const { Model, DataTypes } = require('sequelize')

                const { sequelize } = require('../util/db')

                class Membership extends Model {}

                Membership.init({
                  id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                  },
                  userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'users', key: 'id' },
                  },
                  teamId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'teams', key: 'id' },
                  },
                }, {
                  sequelize,
                  underscored: true,
                  timestamps: false,
                  modelName: 'membership'
                })

                module.exports = Membership

      models/index.js

                ...
                const Team = require('./team')
                const Membership = require('./membership')

                ...

                User.belongsToMany(Team, { through: Membership })
                Team.belongsToMany(User, { through: Membership })

                module.exports = {
                  ... Team, Membership
                }


      CLI commands to insert:

            insert into teams (name) values ('toska');
            insert into teams (name) values ('mosa climbers');
            insert into memberships (user_id, team_id) values (1, 1);
            insert into memberships (user_id, team_id) values (1, 2);
            insert into memberships (user_id, team_id) values (2, 1);
            insert into memberships (user_id, team_id) values (3, 2);

      controllers/users.js

            router.get('/', ...
            ...
                include: [
                  {
                    model: Note,
                    attributes: { exclude: ['userId'] }
                  },
                  {
                    model: Team,
                    attributes: ['name', 'id'],
                    through: {
                      attributes: []
                    }
                  }
                ]
            )

  - Note on the properties of Sequelize model objects

      usually abstract layer return unnormal objects, sequqlize is not exception.
      this code wouldn't work:

                router.get('/:id', async (req, res) => {
                  const user = await User.findByPk(req.params.id, {
                    include: {
                        model: Note
                      }
                    }
                  )

                  if (user) {
                  
                    user.note_count = user.notes.length
                    delete user.notes
                    res.json(user)

                  } else {
                    res.status(404).end()
                  }
                })

      a better way to create new object:

                {
                  username: user.username,
                  name: user.name,
                  note_count: user.notes.length
                }

  - Revisiting many-to-many relationships


  - Eager vs Lazy fetch

    eeager - the user receives all related data
    lazy  -  related data is loaded as needed

    controllers/users.js remove include:{model: Team etc...} from User.findByPK...

              ...
                let teams = undefined

                if (req.query.teams) {
                  teams = await user.getTeams({
                    attributes: ['name'],
                    joinTableAttributes: []
                  })
                }

                res.json({ ...user.toJSON(), teams })

  - Features of models

        models/user.js
                ...
                  modelName: 'user',
                  defaultScope: {
                    where: {
                      disabled: false
                    }
                  },
                  scopes: {
                    admin: {
                      where: {
                        admin: true
                      }
                    },
                    disabled: {
                      where: {
                        disabled: true
                      }
                    }
                  }
                ...

      get users: returns only enabled users (disabled: false)

        controllers/users.js

                const adminUsers = await User.scope('admin').findAll()
            or
                const disabledUsers = await User.scope('disabled').findAll()

         models/user.js

                        ...
                            disabled: {
                              where: {
                                disabled: true
                              }
                            },
                            name(value) {
                              return {
                                where: {
                                  name: {
                                    [Op.iLike]: value
                                  }
                                }
                              }
                            }

        controllers/users.js

                const jamiUsers = await User.scope({ method: ['name', '%jami%'] }).findAll()
            or
                const jamiUsers = await User.scope('admin', { method: ['name', '%jami%'] }).findAll()

commands:
    
    drop table if exists migrations, blogs, users;
