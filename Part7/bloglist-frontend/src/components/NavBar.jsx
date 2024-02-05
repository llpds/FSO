import { Link } from 'react-router-dom'

const NavBar = () => {
  const padding = { padding: 5 }
  return (
    <>
      <Link style={padding} to="/"> Blogs </Link>
      <Link style={padding} to="/users"> Users </Link>
    </>
  )
}

export default NavBar