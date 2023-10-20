import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog , updateBlogs}) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const blogStyle = {
    padding: '10px 5px',
    border: '1px solid #0000cc',
    marginBottom: 5,
    borderRadius: '5px'
  }
  
  const toggleVisibility = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  const handleLike = async () => {
    const blogId = blog.id
    // const blogLikeUp = {...blog, likes: blog.likes + 1} // it is better not to use destructuring here, you need to remember all properties of the object and all fields of the put method and clear unnecessary data by deleting. this may cause errors
    // delete blogLikeUp.id
    // delete blogLikeUp.user 
    const blogToBack = { // I can easily control all the fields and prepare right data for back-end
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    const updatedBlog = await blogService.update(blogId, blogToBack)
    const blogToBlogs = {...blog, likes: updatedBlog.likes} // I save the structure and change some of the data
    updateBlogs(blogToBlogs)
  }

  return (
    <div style={blogStyle}>
      {blog.title} <i>{blog.author}</i>
      <button onClick={toggleVisibility}>{detailsVisibility ? 'hide' :'view'}</button>
      {detailsVisibility && <div>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes}<button onClick={handleLike}>like</button></p>
          <p>user: {blog.user.username}</p>
        </div>}
    </div>  
  )
}

export default Blog