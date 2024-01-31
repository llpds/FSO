import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoggedComponent from './components/auth/LoggedComponent'
import LoginForm from './components/auth/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/elements/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationShow } from './NotificationContext'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const showNotification = useNotificationShow()
  const showMessage = (msg) => showNotification([msg, 'msg'])
  const showError = (msg) => showNotification([msg, 'err'])

  const initBlog = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }


  useEffect(() => {
    initBlog()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const sessionExpired = window.localStorage.getItem('sessionExpired')
    if (loggedUserJSON && sessionExpired) {
      const expire = JSON.parse(sessionExpired)
      if (expire.date > Date.now()) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      } else {
        window.localStorage.removeItem('sessionExpired')
        window.localStorage.removeItem('loggedUser')
      }
    }
  }, [])

  const addBlog = async (newBlog) => {
    const addedBlog = await blogService.create(newBlog)
    blogFormRef.current.toggleVisibility()
    initBlog()
    showMessage(`Added ${addedBlog.title}`)
  }

  const updateBlog = async (updBlog, blogToBack) => {
    await blogService.update(updBlog.id, blogToBack)
    setBlogs(blogs.map((b) => (b.id === updBlog.id ? updBlog : b)))
  }

  const deleteBlog = async (blog) => {
    await blogService.destroy(blog.id)
    setBlogs(blogs.filter((b) => b.id !== blog.id))
    showMessage(`Blog ${blog.title} removed`)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.nullToken()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      window.localStorage.setItem(
        'sessionExpired',
        JSON.stringify({ date: Date.now() + 60 * 60 * 1000 })
      ) //session time

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showError('wrong credentials')
    }
  }

  const blogForm = () => (
    <Togglable
      buttonLabel="new blog"
      hideButtonLabel="cancel"
      ref={blogFormRef}
    >
      <BlogForm blogs={blogs} addBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      <h2>Blog app</h2>

      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}

      {user && (
        <div>
          <LoggedComponent user={user} handleLogout={handleLogout} />
          {blogForm()}
          <h2>blogs</h2>
          <div className="blogsList">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <div key={blog.id}>
                  <Blog
                    blog={blog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                    user={user}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
