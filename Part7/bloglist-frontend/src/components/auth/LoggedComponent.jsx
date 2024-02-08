import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../reducers/loggedUserReducer'
import { Button } from '@mui/material'


const LoggedComponent = () => {
  const dispatch = useDispatch()
  const user = useSelector (state => state.user)
  if(!user) return null
  return(
    <>
      <em>{user.name} logged in</em>
      <Button color="inherit" id="logout_button" onClick={() => dispatch(logoutUser())} >
        Logout
      </Button>
    </>
  )
}

export default LoggedComponent
