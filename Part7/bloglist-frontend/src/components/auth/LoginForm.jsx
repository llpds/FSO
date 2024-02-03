import { loginUser, setUser } from '../../reducers/loggedUserReducer'
import { useDispatch, useSelector } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin =  event => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    event.target.Username.value = ''
    event.target.Password.value = ''
    dispatch(loginUser(username, password))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form id="loginForm" onSubmit={handleLogin}>
        username
        <input type="text" id="userName" name="Username" autoComplete="off" />
        <br />
        password
        <input type="text" id="password" name="Password" autoComplete="off" />
        <br />
        <button id="formSubmitButton" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm