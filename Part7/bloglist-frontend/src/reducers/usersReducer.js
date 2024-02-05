import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) { return action.payload },
    updateNumberOfBlog(state,action) {
      return state.map(u => u.id === action.payload.id ? action.payload : u)
      // return action.payload
    },
    resetUsers(state, action) { return [] }
  }
})

export const { setUsers, resetUsers, updateNumberOfBlog } = usersSlice.actions

export const initializeUsers = () => async dispatch => {
  const users = await usersService.getAll()
  dispatch(setUsers(users))
}

export const clearUsers = () => dispatch => {
  dispatch(resetUsers())
}

export default usersSlice.reducer