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

            docker exec -it peaceful_lamport psql -U postgres postgres

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

  