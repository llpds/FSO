import { createSlice, nanoid } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
name: 'notification',
  initialState: [],
  reducers: {
    setNotification: {
      reducer:(state,action)=>{
        state.push(action.payload)
      },
      prepare: (text) => {
        const id = nanoid()
        return { payload: { id, text } }
      },
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
  }, 5000)
}

export default notificationSlice.reducer