import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const UsersList = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>User name</th>
            <th>blogs created</th>
          </tr>
          {[...users]
            .map(u => (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>
                  {u.blogs.length}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UsersList