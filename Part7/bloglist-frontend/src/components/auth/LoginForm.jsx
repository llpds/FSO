const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => (
  <div>
    <h2>Log in to application</h2>
    <form id="loginForm" onSubmit={handleLogin}>
      username
      <input
        type="text"
        id="userName"
        name="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        autoComplete="off"
      />{' '}
      <br />
      password
      <input
        type="text"
        id="password"
        name="Password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        autoComplete="off"
      />{' '}
      <br />
      <button id="formSubmitButton" type="submit">
        {' '}
        login{' '}
      </button>
    </form>
  </div>
)

export default LoginForm
