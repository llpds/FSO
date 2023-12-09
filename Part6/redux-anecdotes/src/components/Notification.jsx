import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.length > 0)
    return (
      <div style={style}>
        {notification.map((n) => <div key = {(100000 * Math.random()).toFixed(0)}> {n} </div>)}
      </div>
    )

  return (
    <div>
    </div>
  )
}

export default Notification