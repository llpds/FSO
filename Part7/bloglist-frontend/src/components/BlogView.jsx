import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import CommentForm from './CommentForm'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, List, ListItem, ListItemButton,  ListItemIcon, ListItemText } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'


const BlogView = () => {
  const dispatch = useDispatch()
  const user = useSelector (state => state.user)
  const navigate = useNavigate()

  const id = useParams().id
  const blogs = useSelector (state => state.blogs)
  const blog = blogs.find(b => b.id === id)
  if(!blog) {return null}

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const removeButtonStyle = {
    border: '1px solid red',
    borderRadius: '3px',
    color: 'red',
  }

  const buttonRemove = () => {
    if (blog.user.username === user.username) {
      return (
        <Button variant="outlined" color="error" type="submit" size = "small" onClick={handleRemove} startIcon={<DeleteIcon />}>
          Remove blog
        </Button>
      )
    }
  }

  return (
    <div>
      <Typography variant="h5" marginTop= {5} marginBottom={3}>
        Title: {blog.title}
      </Typography>
      <p>Url: {blog.url}</p>
      <p>
      likes: {blog.likes}

      </p>

      <p> Url: {blog.url} </p>
      <p>Added by: {blog.user.name}</p>
      <Button variant="outlined" color="primary" type="submit" size = "small" onClick={handleLike} sx = {{ mr:2 }}>
          Like
      </Button>
      {user && buttonRemove()}
      <h4>Comments:</h4>
      <CommentForm />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List >
          {blog.comments.map(c =>
            <ListItem key={c.id} sx={{ m: -1 }}>
              <ListItemButton>
                <ListItemIcon>  <ChatIcon /> </ListItemIcon>
                <ListItemText primary={c.content} sx = {{ m:0 }}/>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </div>
  )
}

export default BlogView