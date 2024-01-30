import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { clearBlogs, initializeBlogs } from './blogReducer'
import { showErrorRedux } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    poseUser(state, action) {return action.payload}
  }
})

export const { poseUser } = userSlice.actions

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
  } catch {
    dispatch(showErrorRedux())
  }
}

export const logoutUser = () => dispatch => {
  window.localStorage.removeItem('sessionExpired')
  window.localStorage.removeItem('loggedUser')
  blogService.nullToken()
  dispatch(poseUser(null))
  dispatch(clearBlogs())
}

export default userSlice.reducer