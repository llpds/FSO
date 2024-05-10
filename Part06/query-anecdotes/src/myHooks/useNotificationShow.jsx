import { useContext } from 'react'
import NotificationContext from '../NotificationContext'


const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const useNotificationShow = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  const dispatch = notificationAndDispatch[1]
  const show = (text) => {
    const newNotification = { id: generateId(), text}
    dispatch({type: 'SET_NOTIFICATION', payload: newNotification})
    setTimeout(()=>dispatch({type: 'DESTROY_NOTIFICATION', payload: newNotification.id}), 5000)
  }
  return show
}

export default useNotificationShow