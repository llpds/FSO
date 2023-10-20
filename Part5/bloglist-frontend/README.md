# FSO part 5

  - Token based authentication (front-end part)
  - Different ways for testing the React code


### 5.8: Blog list frontend, step8
  - display information of the person after creating a blog before reloading browser
  - The app did not transfer the token to the blog service after updating the page: App.js '''useEffect(... blogService.setToken ...)'''

### 5.9: Blog list frontend, step9
  - like button functionality
  - all .then methods are removed


 ToDo:

  -  data integrity:  ex 5.8. when add new blog, field user in blog has wrong structure.
  -  when the browser is reloaded with expired token in localStorage it still login