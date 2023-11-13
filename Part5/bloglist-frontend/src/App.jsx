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
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()


  // useEffect(async () => ...) works with warning
  // react-dom.development.js:86 Warning: useEffect must not return anything besides a function, which is used for clean-up.
  useEffect(() => {
    const initBlog = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    initBlog()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const sessionExpired = window.localStorage.getItem('sessionExpired')
    if(loggedUserJSON && sessionExpired){
      const expire = JSON.parse(sessionExpired)
      if(expire.date > Date.now()){
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      } else {
        window.localStorage.removeItem('sessionExpired')
        window.localStorage.removeItem('loggedUser')
      }
    }
  },[])

  const updateBlogs = (updatedBlog) => {
    setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
  }

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(b => b.id !== id))
  }

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
      window.localStorage.setItem('sessionExpired', JSON.stringify({ 'date': Date.now() + 60*60*1000 })) //session time

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setMessage(['wrong credentials','err'])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" hideButtonLabel="cancel" ref={blogFormRef}>
      <BlogForm blogs = {blogs} setBlogs = {setBlogs} setMessage = {setMessage} blogFormRef={blogFormRef} user = {user}/>
    </Togglable>
  )

  return (
    <div>
      <Notification message= {message} />
      <h2>Blog app</h2>

      {!user &&
        <LoginForm
          username = {username}
          setUsername = {setUsername}
          password = {password}
          setPassword = {setPassword}
          handleLogin = {handleLogin}
        />
      }

      {user &&
        <div>

          <LoggedComponent user = {user} handleLogout = {handleLogout}/>
          {blogForm()}
          <h2>blogs</h2>
          {blogs
            .sort((a,b) => a.likes - b.likes )
            .map(blog =>
              <div key={blog.id}>
                <Blog
                  blog={blog}
                  updateBlogs = {updateBlogs}
                  deleteBlog = {deleteBlog}
                  user = {user}
                  setMessage = {setMessage}
                />
              </div>
            )
          }
        </div>
      }

    </div>
  )
}

export default App