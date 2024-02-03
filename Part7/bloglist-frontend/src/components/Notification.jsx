import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === null) return null
  const className = `notification ${message[1]}`
  return <div className={className}>{message[0]}</div>
}

export default Notification
