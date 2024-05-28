# 12 Containers

## 12a - Introduction to Containers

  run img
        docker container run hello-world
        docker container run -it ubuntu bash
                -i (--interactive)
                -t (--tty)
                bash to be executed inside the container when we start it.
        docker container run --help

        docker container run -it --name hello-node node:20 bash (named container)

  ls
        docker container ls -a  / docker ps -a
        docker image ls

  start container
        docker start -i CONTAINER-ID-OR-CONTAINER-NAME

  stop container
        docker kill name
        docker container stop name    

  install node inside container
        curl -sL https://deb.nodesource.com/setup_20.x | bash
        apt install -y nodejs

  image from container
        docker commit CONTAINER-ID-OR-CONTAINER-NAME NEW-IMAGE-NAME


## 12b - Building and configuring environments

  - Using Docker compose

    build the image from the Dockerfile and then run it
    Dockerfile:

          FROM node:20

          WORKDIR /usr/src/app

          COPY --chown=node:node . .

          RUN npm ci --omit=dev

          ENV DEBUG=todo_backend:*

          USER node
          CMD npm start

      cli:

          docker build -t express-server . && docker run -p 3123:3000 express-server

    or

    docker-compose.yml:

          # version: '3.8'            # Version 3.8 is quite new and should work
          services:
            app:                    # The name of the service, can be anything
              image: todo_back      # Declares which image to use
              build: .              # Declares where to build if image is not found
              ports:                # Declares the ports to publish
                - 3123:3000

      cli:

          docker compose up
                  --build   (rebuild the images)
                  -d (detached)
          docker compose down

  - Bind mount and initializing the database
    docker-compose.dev.yml:

          services:
            mongo:
              image: mongo
              ports:
                - 3456:27017
              environment:
                MONGO_INITDB_ROOT_USERNAME: root
                MONGO_INITDB_ROOT_PASSWORD: example
                MONGO_INITDB_DATABASE: the_database
              volumes:
                - ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js  # bind init
        # two distinct methods to store the data:        
                - ./mongo_data:/data/db  #1. Declaring a location in your filesystem (called bind mount)

                - mongo_data:/data/db #2. Letting Docker decide where to store the data (volume)
          volumes:            
            mongo_data:


      cli:

          docker compose -f docker-compose.dev.yml down --volumes
          docker compose -f docker-compose.dev.yml up


  - Persisting data with volumes

        string 88 - 94

        1. bind mount: create /data/db and stores data inside. Needs to be added to .gitignore

        2. volume: volume is managed by Docker.
              when app is working:
              
              docker volume ls
              docker volume inspect
              docker volume rm

  - Debugging issues in containers

        docker container run -d nginx
        docker container ls     //NAME and PORT usually 80

        docker container stop NAME
        docker container rm NAME
        docker container run -d -p 8080:80 nginx  -> localhost:8080  -> nginx start page

        

        docker container ls
        docker exec -it NAME bash

        in container:
            cd /usr/share/nginx/html/
            rm index.html   -> localhost:8080  -> error
            echo "Hello, exec!" > index.html   -> localhost:8080  -> Hello, exec!

  - Redis
      docker-compose.dev.yml:

        services:
          redis:
            image: redis
            ports: 
              - 6379:6379
            command: ['redis-server', '--appendonly', 'yes'] # Overwrite the CMD
            volumes: # Declare the volume
              - ./redis_data:/data

      to read: [publish-subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) (or PubSub)

## 12c - Basics of Orchestration

  - React in container

           npm create vite@latest hello-front -- --template react
           npm install
           npm run build

      Dockerfile

            FROM node:20

            WORKDIR /usr/src/app

            COPY . .

            RUN npm ci

            RUN npm run build

            RUN npm install -g serve

            CMD ["serve", "dist"]

      equal: CLI
        npm install -g serve
        serve dist  


      docker build . -t hello-front
      docker run -p 5001:80 hello-front //3000 back, 80 nginx

  - Using multiple stages

        Dockerfile

            FROM node:20 AS build-stage
            WORKDIR /usr/src/app
            
            COPY . .
            
            RUN npm ci
            
            RUN npm run build
            
            # This is a new stage, everything before this is gone, except the files we want to COPY
            FROM nginx:1.25-alpine
            # COPY the directory build from build-stage to /usr/share/nginx/html
            # The target location here was found from the Docker hub page
            COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html


  - Development in containers

        start in development mode and access the files with vscode

        dev.Dockerfile

                  FROM node:20

                  WORKDIR /usr/src/app

                  COPY . .

                  # Change npm ci to npm install since we are going to be in development mode
                  RUN npm install

                  # npm start is the command to start the application in development mode
                  CMD ["npm", "run", "dev", "--", "--host"]

      
          docker build -f ./dev.Dockerfile -t hello-front-dev .  (except m1 - m3)

          if mac arm

              docker run -it -v "$(pwd):/usr/src/app/" front-dev bash
              root@b83e9040b91d:/usr/src/app# npm install


      
      docker-compose.dev.yml

              services:
                app:
                  image: hello-front-dev
                  build:
                    context: . # The context will pick this directory as the "build context"
                    dockerfile: dev.Dockerfile # This will simply tell which dockerfile to read
                  volumes:
                    - ./:/usr/src/app # The path can be relative, so ./ is enough to say "the same location as the docker-compose.yml"
                  ports:
                    - 5173:5173
                  container_name: hello-front-dev # This will name the container hello-front-dev

        docker compose -f docker-compose.dev.yml up

  - Communications between containers in a more ambitious environment