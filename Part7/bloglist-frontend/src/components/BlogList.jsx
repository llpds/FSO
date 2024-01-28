import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
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
              user={user}
            />
          </div>
        ))
      }
    </div>
  )
}

export default BlogList