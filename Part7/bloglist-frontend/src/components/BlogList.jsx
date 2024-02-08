import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import Togglable from './elements/Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogsRedux = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  return (
    <div className="blogsList">

      {user && (<Togglable buttonLabel="new blog" hideButtonLabel="cancel" ref={blogFormRef}>
        <BlogForm blogFormRef = {blogFormRef}/>
      </Togglable>)}
      <h2>Blogs:</h2>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Blog title</TableCell>
              <TableCell align="right">Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...blogsRedux]
              .sort((a, b) => b.likes - a.likes)
              .map((blog, index) => (
                <TableRow
                  key={blog.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row"> {index +1 } </TableCell>
                  <TableCell align="right">
                    <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
                  </TableCell>
                  <TableCell align="right"><i>{blog.author}</i></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList