import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) { return action.payload },
    updateUsersBlogs(state,action) {
      const blog = action.payload
      return state.map(u => u.id === blog.user.id ? { ...u, blogs:u.blogs.concat(blog) } :u)
    },
    resetUsers(state, action) { return [] }
  }
})

export const { setUsers, resetUsers, updateUsersBlogs } = usersSlice.actions

export const initializeUsers = () => async dispatch => {
  const users = await usersService.getAll()
  dispatch(setUsers(users))
}

export const clearUsers = () => dispatch => {
  dispatch(resetUsers())
}

export default usersSlice.reducer