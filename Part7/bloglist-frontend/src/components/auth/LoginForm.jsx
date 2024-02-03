import { useNotificationShow } from '../../NotificationContext'
import { useUserValue, useSetUser } from '../../UserContext'
import loginService from '../../services/login'
import blogService from '../../services/blogs'

const LoginForm = () => {
  const showNotification = useNotificationShow()
  const showError = (msg) => showNotification([msg, 'err'])
  const setUser = useSetUser()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    event.target.Username.value = ''
    event.target.Password.value = ''

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      window.localStorage.setItem(
        'sessionExpired',
        JSON.stringify({ date: Date.now() + 60 * 60 * 1000 })
      ) //session time
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      showError('wrong credentials')
    }
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
        <button id="formSubmitButton" type="submit">
          {' '}
          login{' '}
        </button>
      </form>
    </div>
  )
}

export default LoginForm