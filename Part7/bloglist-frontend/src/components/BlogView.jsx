import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blogs = useSelector (state => state.blogs)
  const blog = blogs.find(b => b.id === id)
  if(!blog) {return null}

  const handleLike = () => {
    dispatch(likeBlog(blog))
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
      </p>
      <p>Added by: {blog.user.name}</p>
    </div>
  )
}

export default BlogView