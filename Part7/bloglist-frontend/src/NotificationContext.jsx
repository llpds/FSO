import { createContext, useContext, useReducer } from 'react'


const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const showNotification = (msgAndStat) => {
    notificationDispatch({ type: "SET_NOTIFICATION", payload: msgAndStat })
    setTimeout(() => {
      notificationDispatch({ type: "SET_NOTIFICATION", payload: null })
    }, 5000)
  }


  return (
    <NotificationContext.Provider value = { [notification, showNotification] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAnDispatch = useContext(NotificationContext)
  return notificationAnDispatch[0]
}

export const useNotificationShow = () => {
  const notificationAnDispatch = useContext(NotificationContext)
  return notificationAnDispatch[1]
}

export default NotificationContext