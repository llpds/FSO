import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoggedComponent from './components/auth/LoggedComponent'
import LoginForm from './components/auth/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/elements/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const blogFormRef = useRef()

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

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm blogs = {blogs} setBlogs = {setBlogs} setMessage = {setMessage} blogFormRef={blogFormRef}/>
    </Togglable>
  )

  return (
    <div>
      <Notification message= {message} />
      <h2>Blog app</h2>
      
      {!user && <LoginForm 
                  username = {username}
                  setUsername = {setUsername}
                  password = {password}
                  setPassword = {setPassword}
                  handleLogin = {handleLogin}
                />}

      {user && 
        <div>

          <LoggedComponent user = {user} handleLogout = {handleLogout}/>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
      
    </div>
  )
}

export default App