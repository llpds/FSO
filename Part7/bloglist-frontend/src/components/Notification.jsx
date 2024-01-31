import { useContext } from 'react'
import { useNotificationValue } from '../NotificationContext'
import './Notification.css'

const Notification = () => {
  const message = useNotificationValue()
  if (message === null) return null
  const className = `notification ${message[1]}`
  return <div className={className}>{message[0]}</div>
}

export default Notification
