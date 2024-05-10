import ShowBlog from './elements/ShowBlog'


const Blogs = ({blogs, setBlogs, setMessage}) => {


    return(
      <table>
        <tbody>
          {blogs.map((blog, index) => <ShowBlog key = {blog.id} blog = {blog} setBlogs = {setBlogs} blogs = {blogs} setMessage = {setMessage} index = {index + 1}/>)}
        </tbody>
      </table>
    )
  }

  export default Blogs