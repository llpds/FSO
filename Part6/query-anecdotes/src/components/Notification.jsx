import useNotificationValue from "../myHooks/useNotificationValue"

const Notification = () => {
  const notifications = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notifications.length < 1) return null

  return (
    <div style={style}>
      {notifications.map((n) => <div key = {n.id}> {n.text} </div>)}
    </div>
  )
}

export default Notification
