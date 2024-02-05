import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from './elements/Togglable'
import BlogForm from './BlogForm'

import Blog from './Blog'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogsRedux = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  return (
    <div className="blogsList">

      {user && (<Togglable buttonLabel="new blog" hideButtonLabel="cancel" ref={blogFormRef}>
        <BlogForm blogFormRef = {blogFormRef}/>
      </Togglable>)}
      <h2>blogs</h2>
      {[...blogsRedux]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Blog
              blog={blog}
            />
          </div>
        ))
      }
    </div>
  )
}

export default BlogList