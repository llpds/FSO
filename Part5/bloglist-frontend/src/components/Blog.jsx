import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const blogStyle = {
    padding: '10px 5px',
    border: '1px solid #0000cc',
    marginBottom: 5,
    borderRadius: '5px'
  }

  const removeButtonStyle = {
    border: '1px solid red',
    borderRadius: '3px',
    color: 'red'
  }

  const toggleVisibility = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  const handleLike = () => {
    const updBlog = { ...blog, likes: blog.likes + 1 } // I save the structure and change some of the data
    const blogToBack = { // I can easily control all the fields and prepare right data for back-end
      title: updBlog.title,
      author: updBlog.author,
      url: updBlog.url,
      likes: updBlog.likes
    }

    // ex 5.15 '...the event handler the component received AS PROPS is called twice' -> move handleLike to app.jsx and handleRemove at the same time
    updateBlog(updBlog, blogToBack)
  }

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title}`)){
      deleteBlog(blog)
    }
  }

  const buttonRemove = () => {
    if(blog.user.username === user.username){
      return (
        <button style={removeButtonStyle} onClick={handleRemove}>remove</button>
      )
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} <i>{blog.author}</i>
      <button onClick={toggleVisibility}>{detailsVisibility ? 'hide' :'view'}</button>
      {detailsVisibility &&
        <div>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes}<button onClick={handleLike}>like</button></p>
          <p>user: {blog.user.username}</p>
          {buttonRemove()}
        </div>}
    </div>
  )
}

export default Blog