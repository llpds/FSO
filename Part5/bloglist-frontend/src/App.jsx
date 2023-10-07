import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setErrorMessage('wong credentials')
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const pageForm = () => {
    if(user === null){
      return (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit = {handleLogin}>
            username
            <input 
              type = "text"
              name = "Username"
              value = {username}
              onChange = {({target}) => setUsername(target.value)}
            /> <br />
            password
            <input 
              type = "text"
              name = "Password"
              value = {password}
              onChange = {({target}) => setPassword(target.value)}
            /> <br />
            <button type = "submit"> login </button>
          </form>
        </div>
      )      
    }
  
    return (
      <div>
        <h2>blogs</h2>
        <h4>{user.name} logged in</h4>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }


  return (
    <div>
      <Notification message= {errorMessage} />
      {pageForm()}
    </div>
  )
}

export default App