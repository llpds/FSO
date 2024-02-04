# FSO part 7

bloglist-frontend from ex5.23
for back use blog-backend from Part4

### 7.9: automatic code formatting

  - with prettier


## Redux branch

### 7.10: Redux, step1

  - store notification in the Redux store (7.10)

### 7.11: Redux, step2

  - store blog posts in the Redux store
  - create new blog with redux (controlled input)

### 7.12: Redux, step3

  - like and delete functionality with Redux
  - decomposition: blogList
  - blocks are initialized after user login

### 7.13: Redux, step4

  - store signed-in user in the Redux store
  - in login and create new blog forms is used uncontrolled input


## React Query and context

### 7.10: React Query and context step1

  - useReducer-hook and context manage the notification data
    
### 7.11: React Query and context step2

  - React-query manages blogs data (display blogs and create new one, controlled input)

### 7.12: React Query and context step3
  
  - like and delete functionality with Query
  - decomposition blogForm (Create), blogList (Read, Upd, Delete)
      App use blogService two time in blogForm and blogList: does not cause additional calls to the backend

### 7.13: React Query and context step4

  - useReducer-hook and context manage the data for the logged in user.

## master branch, State management: Redux

### 7.14: Users view

  - new view which shows all users information. (column: user, blogs created) 
      http://localhost:5173/users

### 7.15: Individual user view

  - view for individual user with added blogs title
