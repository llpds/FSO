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

 ToDo:

  -  data integrity:  ex 5.8. when add new blog, field user in blog has wrong structure.
     now concatenated blog.user hasn't the same ids as in the database (blogForm.jsx line:51-52)
     if you try to update the data before refreshing the page could cause an error

    !!! update this part when you'll make frontend specific blog output functionality(example showBlog/id)


  -  when the browser is reloaded with expired token in localStorage it still login

  -  button like works incorrect!!!