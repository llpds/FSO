import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (message === null) return null
  const severity = message[1]==='msg'?'success':'warning'
  return (<Alert severity={severity}>{message[0]}</Alert>)
}

export default Notification
