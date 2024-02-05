import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../reducers/loggedUserReducer'


const LoggedComponent = () => {
  const dispatch = useDispatch()
  const user = useSelector (state => state.user)
  if(!user) return null
  return(
    <>
      <em>{user.name} logged in</em>
      <button id="logout_button" type="submit" onClick={() => dispatch(logoutUser())}>
        Logout
      </button>
    </>
  )
}

export default LoggedComponent
