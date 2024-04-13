import PropTypes from 'prop-types'

const Notify = ({ errorMessage = null, message = null }) => {

  if (errorMessage) {
    return (
      <div style={{ color: 'red' }}>    {errorMessage}    </div>
    )
  }

  if(message){
    return (
      <div style={{ color: 'green' }}>    {message}    </div>
    )
  }

  return null
}

Notify.propTypes = {
  errorMessage: PropTypes.string,
  message: PropTypes.string
}

export default Notify