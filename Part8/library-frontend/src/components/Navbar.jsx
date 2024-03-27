import { Link } from 'react-router-dom'

const NavBar = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/authors"> authors </Link>
      <Link style={padding} to="/"> books </Link>
      <Link style={padding} to="/newbook"> new book </Link>
    </div>
  )
}

export default NavBar