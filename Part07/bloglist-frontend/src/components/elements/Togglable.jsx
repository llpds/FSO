import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <Button
        style={hideWhenVisible}
        variant="outlined"
        color="primary"
        type="submit"
        size = "large"
        onClick={toggleVisibility}
      >
        {props.buttonLabel}
      </Button>

      <div style={showWhenVisible}>
        {props.children}
        <Button
          sx= {{ margin: 1 }}
          variant="outlined"
          color="primary"
          type="submit"
          size = "large"
          onClick={toggleVisibility}
        >
          {props.hideButtonLabel}
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
}
export default Togglable
