import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'


const UsersList = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <h2>Users</h2>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...users]
              .map((u, index) => (
                <TableRow
                  key={u.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row"> {index +1 } </TableCell>
                  <TableCell align="right">
                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                  </TableCell>
                  <TableCell align="right"><i>{u.blogs.length}</i></TableCell>

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersList