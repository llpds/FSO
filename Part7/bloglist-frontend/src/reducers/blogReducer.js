import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showMessageRedux } from '../reducers/notificationReducer'
import { updateNumberOfBlog, initializeUsers } from './usersReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) { state.push(action.payload)},
    setBlogs(state, action) { return action.payload },
    updateBlog(state, action) {
      return state.map(b => b.id === action.payload.id ? action.payload : b)
    },
    updateComment(state, action) {
      const updatedBlog = action.payload.blog
      return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
    },
    destroyBlog(state, action) {
      return state.filter(b => b.id !==action.payload.id)
    },
    resetBlog(state, action) {
      return []
    }
  },
})

export const { appendBlog, setBlogs, updateBlog, destroyBlog, resetBlog, updateComment } = blogSlice.actions

export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = content => async dispatch => {
  const addedBlog = await blogService.create(content)
  dispatch(appendBlog(addedBlog))
  dispatch(updateNumberOfBlog(addedBlog.user))
  dispatch(showMessageRedux(`Added ${addedBlog.title}`))
}

export const makeComment = (id, comment) => async dispatch => {
  const updatedComment = await blogService.createComment(id, comment)
  dispatch(updateComment(updatedComment))
}

export const likeBlog = blog => async dispatch => {
  const { user, ...prepBlog } = blog // no need to send users info to backend
  const updatedBlog = await blogService.update(blog.id, { ...prepBlog,  likes: blog.likes +1 })
  console.log('updatedBlog', updatedBlog)
  dispatch(updateBlog(updatedBlog))
}

export const deleteBlog = blog => async dispatch => {
  await blogService.destroy(blog.id)
  dispatch(showMessageRedux(`Blog ${blog.title} removed`))
  dispatch(destroyBlog(blog))
  dispatch(initializeUsers())
}

export const clearBlogs = () => dispatch => {
  dispatch(resetBlog())
}



export default blogSlice.reducer