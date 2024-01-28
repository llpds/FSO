import { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const dispatch = useDispatch()
  const blogStyle = {
    padding: '10px 5px',
    border: '1px solid #0000cc',
    marginBottom: 5,
    borderRadius: '5px',
  }

  const removeButtonStyle = {
    border: '1px solid red',
    borderRadius: '3px',
    color: 'red',
  }

  const toggleVisibility = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(deleteBlog(blog))
    }
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
    <div className="blog" id={blog.title.replaceAll(' ', '')} style={blogStyle}>
      {blog.title} <i>{blog.author}</i>
      <button className="blogVisibility" onClick={toggleVisibility}>
        {detailsVisibility ? 'hide' : 'view'}
      </button>
      {detailsVisibility && (
        <div>
          <p>url: {blog.url}</p>
          <p>
            likes: {blog.likes}
            <button className="likeButton" onClick={handleLike}>
              like
            </button>
          </p>
          <p>user: {blog.user.username}</p>
          {buttonRemove()}
        </div>
      )}
    </div>
  )
}

// blog, user, updateBlog, deleteBlog
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
export default Blog
