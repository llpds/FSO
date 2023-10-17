import {useState} from 'react'

const Blog = ({ blog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(true)
  const blogStyle = {
    padding: '10px 5px',
    border: '1px solid #0000cc',
    marginBottom: 5,
    borderRadius: '5px'
  }
  
  const toggleVisibility = () => {
    setDetailsVisibility(!detailsVisibility)
  }

  return (
    <div style={blogStyle}>
      {blog.title} 
      <button onClick={toggleVisibility}>{detailsVisibility ? 'hide' :'view'}</button>
      {detailsVisibility && <div>
        {blog.url} <br />
        {blog.likes} <button>like</button> <br />
        {blog.user.username}  
        </div>}
    </div>  
  )
}

export default Blog