import { createSlice } from '@reduxjs/toolkit'


const noteSlice = createSlice({
  name: 'notAvailable',
  initialState: null,
  reducers: {
    changeStatus(state, action) {
      return action.payload
    }
  },
})

export const { changeStatus } = noteSlice.actions

export const setStatus = status => dispatch => {
  dispatch(changeStatus(status === 'notAvailable' ? status : null))
}

export default noteSlice.reducer