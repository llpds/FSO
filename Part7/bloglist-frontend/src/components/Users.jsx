import { useSelector } from 'react-redux'


const Users = () => {
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
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users