import { loginUser } from '../../reducers/loggedUserReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TextField, Box, Button } from '@mui/material'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = event => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    event.target.Username.value = ''
    event.target.Password.value = ''
    dispatch(loginUser(username, password))
    navigate('/')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Box
        id="loginForm"
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <TextField
          id="blogFormTitle"
          label="Username"
          variant="outlined"
          size = "small"
          name="Username"
        />
        <TextField
          id="blogFormAuthor"
          label="Password"
          variant="outlined"
          size = "small"
          name="Password"
        />
        <Button variant="outlined" color="primary" type="submit" size = "large">
          login
        </Button>
      </Box>
    </div>
  )
}

export default LoginForm