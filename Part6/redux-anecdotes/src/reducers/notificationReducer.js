import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
name: 'notification',
  initialState: [],
  reducers: {
    setNotification(state,action){
      state.push(action.payload)
    },
    clearNotification(state){
      state.shift()
    }
  }
})

export const {setNotification, clearNotification} = notificationSlice.actions

export const showNnotification = (data) => (dispatch) => {
  dispatch(setNotification(data))
  setTimeout(() => {
    dispatch(clearNotification())
  }, 4000)
}

export default notificationSlice.reducer