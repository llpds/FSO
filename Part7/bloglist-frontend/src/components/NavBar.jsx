import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import LoggedComponent from './auth/LoggedComponent'

const NavBar = () => {
  const user = useSelector (state => state.user)
  const padding = { padding: 5 }
  return (
    <>
      <AppBar position="fixed">
        <Toolbar width='100%'>
          <Box sx={{ flexGrow: 1 }} >
            <Button color="inherit" component={Link} to="/" sx={{ flexGrow: 1 }}>
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users" sx={{ flexGrow: 1 }}>
              Users
            </Button>
          </Box>
          <Box sx={{ mr: 0 }} >
            {user
              ? <LoggedComponent/>
              : <em>Hello wayfarer, at first need <Button color="inherit" component={Link} to="/login" sx={{ flexGrow: 6 }}> login </Button > </em>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default NavBar