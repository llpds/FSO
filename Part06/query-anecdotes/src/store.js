import { configureStore } from '@reduxjs/toolkit'

import notAvailableReducer from './reducers/notAvailableReducer'

const store = configureStore({
  reducer: {
    notAvailable: notAvailableReducer,
  }
})

export default store