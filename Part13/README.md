# [FSO part 13 - Relational databases ](https://fullstackopen.com/en/part13)

  app for fly postgres

  node-sequelize -  practice via Docker
  blog - exercises for this chapter via Fly
  
  Synopsis - short overview with tips
  
  - ex 13.1 - 13.3
    - connection to db (connect.js)
    - the blogs table CLI creation
    - print blogs data on the commandline (cli.js)

  - ex 13.4
    endpoint: api/blogs (index.js)
      - GET (blogs list)
      - POST (add blog)
      - DELETE (delete blog dy id)

  - ex 13.5-13.6
    - change app structures according with convention
    - PUT method changes likes

  - ex 13.7 - 13.12
    - express-async-errors to work with error
    - user management: endpoint: api/users
      - POST (add user)
      - GET (all users)
      - PUT (change username)
    - POST api/login
    - isEmail username validation
    - logged user is linked to added blog via token
    - blog deletion only by creator
    - show related info(users blogs og blogs creator) when shows users or blogs


  - ex 13.13 - 13.16
    - filtering blogs by title using keyword 
      - GET /api/blogs?search=react return all blogs with "react"
      - GET /api/blogs  returns all blogs
    - filtering blog by title or author
    - blogs based on likes in descending order
    - GET /api/authors  returns author, number of blogs, total number of likes

  - ex 13.17
    - migration initialize the database (same fields as in models tables + created_at, updated_at manually)

  - ex 13.18
    - year field into blog table migration, year validation in model

  - ex 13.19
    - users reading list with blog status (unread by default, later could be marked as read) (user blog migrations 02)
