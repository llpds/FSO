const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit = {handleLogin}>
      username
      <input 
        type = "text"
        name = "Username"
        value = {username}
        onChange = {({target}) => setUsername(target.value)}
        autoComplete="off"
      /> <br />
      password
      <input 
        type = "text"
        name = "Password"
        value = {password}
        onChange = {({target}) => setPassword(target.value)}
        autoComplete="off"
      /> <br />
      <button type = "submit"> login </button>
    </form>
  </div>
)

export default LoginForm