import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoggedComponent from './components/auth/LoggedComponent'
import LoginForm from './components/auth/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/elements/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { showErrorRedux, showMessageRedux } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const blogsRedux = useSelector(state => state.blogs)

  const bl = [...blogsRedux].sort((a, b) => b.likes - a.likes)
  const blRd = bl
  console.log('blogsRedux', blRd)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const sessionExpired = window.localStorage.getItem('sessionExpired')
    if (loggedUserJSON && sessionExpired) {
      dispatch(initializeBlogs())
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
  }, [dispatch])


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
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(showErrorRedux('Wrong credentials'))
    }
  }

  const blogForm = () => (
    <Togglable
      buttonLabel="new blog"
      hideButtonLabel="cancel"
      ref={blogFormRef}
    >
      <BlogForm blogs={[...blogsRedux]} blogFormRef = {blogFormRef}/>
    </Togglable>
  )

  return (
    <div>
      <Notification/>
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
          <BlogList user={user} />
        </div>
      )}
    </div>
  )
}

export default App
