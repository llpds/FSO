import { useState } from 'react'
import { useNotificationShow } from '../NotificationContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, user, deleteBlog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
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
  const showNotification = useNotificationShow()
  const showMessage = (msg) => showNotification([msg, 'msg'])

  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.destroy,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const toggleVisibility = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  const handleLike = () => {
    const blogToUpd = { ...blog, likes: blog.likes + 1 }
    const { user, ...blogToBack } = blogToUpd // no need to send users info to backend
    updateBlogMutation.mutate(blogToBack)
    showMessage(`Blog ${blogToUpd.title} liked`)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleteBlogMutation.mutate(blog.id)
      showMessage(`Blog ${blog.title} removed`)
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
