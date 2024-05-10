import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    setNotification(state, action) {return action.payload}
  }
})

export const { setNotification } = notificationSlice.actions

export const showMessageRedux = msg => {
  return dispatch => {
    dispatch(setNotification([msg, 'msg']))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }
}

export const showErrorRedux = msg => {
  return dispatch => {
    dispatch(setNotification([msg, 'err']))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }
}

export default notificationSlice.reducer