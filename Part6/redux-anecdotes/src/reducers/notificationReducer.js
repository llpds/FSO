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
    destroyNotification(state, action){
      return state.filter(s => s.id !== action.payload)
    }
  }
})

export const {setNotification, destroyNotification} = notificationSlice.actions

export const showNnotification = (data, time=4) => dispatch => {
  const id = dispatch(setNotification(data)).payload.id
  setTimeout(() => {
    dispatch(destroyNotification(id))
  }, time * 1000)
}

export default notificationSlice.reducer