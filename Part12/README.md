# [FSO part 12 - Containers](https://fullstackopen.com/en/part12)

  app-lp
      Express app created via npx express-generator
      port:3000
      container: zen_cartwright
      img: express-server

  Synopsis - short overview with tips
  
  - ex 12.1 - 12.4: script-answers
  - ex 12.5 - 12.6: todo-app/todo-backend
      container: determined_lalande
      img: todo_back

      localhost:3123

      ex5 by Dockerfile

      ex6 by docker-compose.yml

  - ex 12.7 todo-app backend outside a container, just the MongoDB is containerized
          db: todo-backend-mongo-1
          localhost:3000
          get one todo: GET /todos/:id
          update: PUT /todos/:id

  - ex 12.8: script-answers

  - ex 12.9-12.12: todo-app/todo-backend  + redis/addedTodosCount
          change data in Redis container using cli
          save data in redis_data folder on host machine

  - ex 12.13 todo-app/todo-fontend
          .env for local
          container works with both: .env file or ENV in Dockerfile

  - ex 12.14 todo-frontend
          created new component Todo.jsx for List.jsx
          tested Todo component used vitest, build image with test and run container, all work good
          fixed: todo-backend get by id and put through middleware

  - ex 12.15
      development of the todo-frontend while it is running inside a container using volumes

  - ex 12.16
      todo-backend in a development container

  - ex 12.17 - 12.19
      app works via proxy w/o front and back exposed ports

  - ex 12.20
      app via production nginx.conf and docker-compose.yml

  - ex 12.21 - 12.22
      phonebook (front + back + docker, based on the repository for part 3)
      dev + prod
