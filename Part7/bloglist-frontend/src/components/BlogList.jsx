import { useSelector } from 'react-redux'

import Blog from './Blog'

const BlogList = () => {
  const blogsRedux = useSelector(state => state.blogs)

  return (
    <div className="blogsList">
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