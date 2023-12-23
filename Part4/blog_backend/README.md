# FullStackOpen exercises for part 4.

new structure:
  build
    frontend

  controllers
    blogs.js
    login.js
    users.js

  models
    blog.js
    user.js

  utils
    config.js
    list-helper.js
    logger.js
    middleware.js

  index.js
  app.js
  package-loc.json
  package.json

implemented:
- tests for backend with mocking database, essentially it's test-driven development (TDD) , realized with: cross-ev, jest, supertest.
- user authentication and authorization, realized with: JWT, bcrypt

for checking the uniqueness of a field: mongoose-unique-validator

Usually a token is sensitive information, in this case (training project) it is not.
I find it is convenient to store the training tokens in the repository, otherwise all request/*JWT.rest files would not be uploaded to the repository

## UPD: 

19.10.2023
  - JWT error message (utils/middleware: errorHandler, userExtractor)