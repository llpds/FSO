import { Link } from 'react-router-dom'

const NavBar = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Link style={padding} to="/authors"> authors </Link>
      <Link style={padding} to="/books"> books </Link>
    </div>
  )
}

export default NavBar