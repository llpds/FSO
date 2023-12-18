import PropTypes from 'prop-types'
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = ( state = [], action ) => {
  switch (action.type){
    case 'SET_NOTIFICATION':
      return [...state].concat(action.payload)
    case 'DESTROY_NOTIFICATION':
      return state.filter(s => s.id !== action.payload)
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notifications, notificationsDispatch] = useReducer(notificationReducer, [])

  return (
    <NotificationContext.Provider value={[notifications, notificationsDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes={
  children: PropTypes.object.isRequired
}

export default NotificationContext