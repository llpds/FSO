import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export default useNotificationValue