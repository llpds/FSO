import { useState, useEffect, useRef, useContext } from 'react'
import BlogForm from './components/BlogForm'
import LoggedComponent from './components/auth/LoggedComponent'
import LoginForm from './components/auth/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Togglable from './components/elements/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import requestService from './requests'
import { useNotificationShow } from './NotificationContext'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const showNotification = useNotificationShow()
  const showMessage = (msg) => showNotification([msg, 'msg'])
  const showError = (msg) => showNotification([msg, 'err'])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const sessionExpired = window.localStorage.getItem('sessionExpired')
    if (loggedUserJSON && sessionExpired) {
      const expire = JSON.parse(sessionExpired)
      if (expire.date > Date.now()) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
        requestService.setToken2(user.token)
      } else {
        window.localStorage.removeItem('sessionExpired')
        window.localStorage.removeItem('loggedUser')
      }
    }
  }, [])

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
          <Togglable buttonLabel="new blog" hideButtonLabel="cancel" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <div className="blogsList">
            <BlogList user = {user}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
