import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showMessageRedux } from '../reducers/notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) { state.push(action.payload)},
    setBlogs(state, action) {return action.payload}
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const addedBlog = await blogService.create(content)
    dispatch(appendBlog(addedBlog))
    dispatch(showMessageRedux(`Added ${addedBlog.title}`))
  }
}

export default blogSlice.reducer