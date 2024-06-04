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