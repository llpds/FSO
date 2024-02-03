import { useRef } from 'react'
import { useUserValue } from './UserContext'
import BlogForm from './components/BlogForm'
import LoggedComponent from './components/auth/LoggedComponent'
import LoginForm from './components/auth/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Togglable from './components/elements/Togglable'

const App = () => {
  const blogFormRef = useRef()
  const user = useUserValue()

  return (
    <div>
      <Notification />
      <h2>Blog app</h2>

      {!user && (
        <LoginForm/>
      )}

      {user && (
        <div>
          <LoggedComponent />
          <Togglable buttonLabel="new blog" hideButtonLabel="cancel" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <div className="blogsList">
            <BlogList/>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
