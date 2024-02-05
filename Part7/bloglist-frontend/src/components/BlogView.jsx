import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

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
        <button
          className="removeButton"
          style={removeButtonStyle}
          onClick={handleRemove}
        >
          remove
        </button>
      )
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <br />
      <p>{blog.url}</p>
      <p>
        likes: {blog.likes}
        <button className="likeButton" onClick={handleLike}>
          like
        </button>
        {buttonRemove()}
      </p>
      <p>Added by: {blog.user.name}</p>
    </div>
  )
}

export default BlogView