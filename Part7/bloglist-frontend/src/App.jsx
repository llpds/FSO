import { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoggedComponent from './components/auth/LoggedComponent'
import LoginForm from './components/auth/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/elements/Togglable'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {

  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const user = useSelector (state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const sessionExpired = window.localStorage.getItem('sessionExpired')
    if (loggedUserJSON && sessionExpired) {
      const expire = JSON.parse(sessionExpired)
      if (expire.date > Date.now()) {
        dispatch(initializeBlogs())
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
        blogService.setToken(user.token)
      } else {
        window.localStorage.removeItem('sessionExpired')
        window.localStorage.removeItem('loggedUser')
        dispatch(logoutUser())
      }
    }
  }, [])


  return (
    <div>
      <Notification/>
      <h2>Blog app</h2>

      {!user && (
        <LoginForm />
      )}

      {user && (
        <div>
          <LoggedComponent/>
          <Togglable buttonLabel="new blog" hideButtonLabel="cancel" ref={blogFormRef}>
            <BlogForm blogFormRef = {blogFormRef}/>
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
