import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../reducers/userReducer'

const LoggedComponent = () => {
  const dispatch = useDispatch()
  const user = useSelector (state => state.user)
  return(
    <p>
      {user.name} logged in
      <button id="logout_button" type="submit" onClick={() => dispatch(logoutUser())}>
        Logout
      </button>
    </p>
  )
}

export default LoggedComponent
