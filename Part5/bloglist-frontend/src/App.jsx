import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  },[])
  

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.nullToken()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setMessage(['wong credentials','err'])
      setTimeout(()=> {
        setMessage(null)
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
        <p>{user.name} logged in
          <button
              id ='logout_button'
              type='submit'
              onClick={handleLogout}
            >
              Logout
          </button>
        </p>

        <BlogForm blogs = {blogs} setBlogs = {setBlogs} setMessage = {setMessage}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }


  return (
    <div>
      <Notification message= {message} />
      <h2>Add a new</h2>
      {pageForm()}
    </div>
  )
}

export default App