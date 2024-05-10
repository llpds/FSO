import PropTypes from 'prop-types'
import './Notification.css'

const Notification = ({ notification }) => {
  if(notification === '') return null
  const className = `notification msg`
  return(
    <div className = {className}>
      {notification}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired
}

export default Notification