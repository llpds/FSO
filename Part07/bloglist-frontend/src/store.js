import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import usersReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: loggedUserReducer,
    users: usersReducer,
    notification: notificationReducer
  }
})

export default store