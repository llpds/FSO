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

          docker-compose.yml
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

        1. bind mount: create /data/db adn stores data inside. Needs to be added to .gitignore

        2. volume: volume is managed by Docker.
              when app is working:
              
              docker volume ls
              docker volume inspect
              docker volume rm