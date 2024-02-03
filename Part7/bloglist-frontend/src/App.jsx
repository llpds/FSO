import { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logoutUser, setUser } from './reducers/loggedUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import {  BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BlogList from './components/BlogList'
import Users from './components/Users'
import LoggedComponent from './components/auth/LoggedComponent'
import LoginForm from './components/auth/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'

const App = () => {



  const dispatch = useDispatch()
  const user = useSelector (state => state.user)
  const users = useSelector (state => state.users)
  console.log('users', users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const sessionExpired = window.localStorage.getItem('sessionExpired')
    if (loggedUserJSON && sessionExpired) {
      const expire = JSON.parse(sessionExpired)
      if (expire.date > Date.now()) {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
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
    <Router>
      <Notification/>
      <h2>Blog app</h2>

      {!user && (
        <LoginForm />
      )}

      {user && (
        <div>
          <LoggedComponent/>
          <Routes>
            <Route path="/users" element = {<Users />} />
            <Route path="/" element = {<BlogList />} />
          </Routes>
        </div>
      )}
    </Router>
  )
}

export default App
