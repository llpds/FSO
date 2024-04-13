import { Link } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

import PropTypes from 'prop-types'
import styles from './Component.module.css'

const NavBar = ({ token, setToken }) => {
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  // This is an example of design using the CSS module and without
  const padding = {
    'paddingRight': '5',
    'borderRadius': '5px',
    'backgroundColor': 'white',
    'padding': '5px 10px',
    'margin': '2px',
    'border': '1px solid #aaa',
    'color': 'darkblue',
    'textDecoration': 'none'
  }
  return (
    <div>
      <Link className={styles.lnk} to="/authors"> authors </Link>
      <Link className={styles.lnk} to="/"> books </Link>
      {token
        ? <>
          <Link className={styles.lnk} to="/newbook"> add book </Link>
          <Link style={padding} to="/recommend"> recommend </Link>
          <button style={padding} onClick={logout}>logout</button>
        </>
        : <Link style={padding} to="/login"> login </Link>
      }

    </div>
  )
}

NavBar.propTypes = {
  setToken: PropTypes.func,
  token: PropTypes.string
}

export default NavBar