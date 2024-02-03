import { useQuery } from '@tanstack/react-query'
import { useUserValue } from '../UserContext'
import blogService from '../services/blogs'
import Blog from './Blog'


const BlogList = () => {
  const user = useUserValue()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if(result.isLoading) { return <div> Loading data...</div> }
  const blogs = result.data

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Blog
              blog={blog}
              user = {user}
            />
          </div>
        ))}
    </div>
  )
}

export default BlogList