import { useUserValue, useSetUser } from '../../UserContext'
import blogService from '../../services/blogs'

const LoggedComponent = () => {
  const user = useUserValue()
  const setUser = useSetUser()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.nullToken()
    setUser(null)
  }

  return (
    <p>
      {user.name} logged in
      <button id="logout_button" type="submit" onClick={handleLogout}>
        Logout
      </button>
    </p>
  )
}


export default LoggedComponent
