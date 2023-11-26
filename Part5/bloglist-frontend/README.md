# FSO part 5

  - Token based authentication (front-end part)
  - Different ways for testing the React code


### 5.8: Blog list frontend, step8
  - display information of the person after creating a blog before reloading browser
  - The app did not transfer the token to the blog service after updating the page: App.js '''useEffect(... blogService.setToken ...)'''

### 5.9: Blog list frontend, step9
  - like button functionality
  - all .then methods are removed

### 5.10: Blog list frontend, step10
  - blog is listed by number of likes

### 5.11: Blog list frontend, step11
  - button and logic for deleting blog posts
  - LANZAROTE: 
      Charco de los Clicos
      Playa del Janubio
      Los Charcones
      Playa Mujeres
      Playa de la Arena
      Playa de los Pocillos
      Playa del Jablillo
      Jameos del Agua
      Cueva de los Verdes
      Mirador del Rio
      Bodega Los Almacenes
      Mirador de El Risco
      Mirador Barranco del Chafaris
      Volcan El Cuervo
      Natural del Timanfaya

### 5.12: Blog list frontend, step12
  - propTypes
  - ESLint
  

### 5.13 & 5.14: Blog list tests, step1 & 2
  - when the browser is reloaded with expired token in localStorage it still login: token lifetime 1h, after loggin frontEnd has the same period of time before cleaning local storage
  - tests for blog rendering before and after clicking button view. (with CSS classes as mark for tests)

### 5.15: Blog list tests, step3
   - test that ensures that if the like button is clicked twice, the event handler the component received as props is called twice.
   - data integrity:  ex 5.8. when add new blog, field user in blog has wrong structure.
     now concatenated blog.user hasn't the same ids as in the database (blogForm.jsx line:51-52)
     if you try to update the data before refreshing the page could cause an error

    !!! could update this part when you'll make frontend specific blog output functionality(example showBlog/id)
    and now just update blog list after saving

### 5.16: Blog list tests, step4
  - test for the new blog form
  - blogFormRef.current.toggleVisibility() moved from Blogform.jsx to app.jsx/addBlog().
  - Blogform.jsx: added checking the length of the blogs array

### 5.17: bloglist end to end testing, step1
  - test for checking that the application displays the login form

### 5.18: bloglist end to end testing, step2
  - added baseURL and BACKEND to cypress.config.js
  - creating a new user before each test
  - successful and unsuccessful login attempts.
  - check that the notification with unsuccessful login is red.

### 5.19: bloglist end to end testing, step3
  - cypress commands: login, createUser, createBlog
  - create blog
  - ensure that new blog in the blogs list