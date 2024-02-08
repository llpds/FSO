import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { initializeBlogs } from './blogReducer'
import { clearUsers, initializeUsers } from './usersReducer'
import { showMessageRedux, showErrorRedux } from './notificationReducer'

const loggedUserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    poseUser(state, action) {return action.payload}
  }
})

export const { poseUser } = loggedUserSlice.actions

export const setUser = user => async dispatch => {
  dispatch(poseUser(user))
}

export const loginUser = (username, password) => async dispatch => {
  try {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    window.localStorage.setItem(
      'sessionExpired',
      JSON.stringify({ date: Date.now() + 60 * 60 * 1000 })
    ) // session time

    blogService.setToken(user.token)
    dispatch(poseUser(user))
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(showMessageRedux(`User ${user.name} logged in`))
  } catch {
    dispatch(showErrorRedux('wrong credentials'))
  }
}

export const logoutUser = () => dispatch => {
  window.localStorage.removeItem('sessionExpired')
  window.localStorage.removeItem('loggedUser')
  blogService.nullToken()
  dispatch(poseUser(null))
  dispatch(clearUsers())
  dispatch(showMessageRedux('You logged out. Have a nice day.'))
}

export default loggedUserSlice.reducer