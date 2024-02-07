import { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logoutUser, setUser } from './reducers/loggedUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import {  BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import BlogList from './components/BlogList'
import UsersList from './components/UsersList'
import UserInfo from './components/UserInfo'
import LoggedComponent from './components/auth/LoggedComponent'
import LoginForm from './components/auth/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import BlogView from './components/BlogView'
import NavBar from './components/NavBar'

const App = () => {



  const dispatch = useDispatch()
  const user = useSelector (state => state.user)
  // const users = useSelector (state => state.users)
  // console.log('users main', users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const sessionExpired = window.localStorage.getItem('sessionExpired')
    dispatch(initializeBlogs())
    if (loggedUserJSON && sessionExpired) {
      const expire = JSON.parse(sessionExpired)
      if (expire.date > Date.now()) {
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
  }, [dispatch])


  return (
    <>
      <Notification/>
      <NavBar />
      {user
        ? <LoggedComponent/>
        : <em>Hello wayfarer, at first need <Link to="/login"> login </Link> </em>
      }

      <h2>Blog app</h2>

      <Routes>
        <Route path="/users/:id" element = {<UserInfo />} />
        <Route path="/blogs/:id" element = {<BlogView />} />
        <Route path="/login" element = {user ? <Navigate replace to="/" /> : <LoginForm />} />
        <Route path="/users" element={user ? <UsersList /> : <Navigate replace to="/login" />} />
        <Route path="/" element = { <BlogList /> } />
      </Routes>
    </>
  )
}

export default App
