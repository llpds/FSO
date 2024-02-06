import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, makeComment, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'

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
        {user && buttonRemove()}
      </p>
      <p>Added by: {blog.user.name}</p>
      <h4>Comments:</h4>
      <CommentForm />
      <ul>
        {blog.comments.map(c => <li key={c.id}> {c.content} </li>)}
      </ul>
    </div>
  )
}

export default BlogView