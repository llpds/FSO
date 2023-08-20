const Blog = ({blog, index}) =>  {

    return(
        <tr>
                <td>{index}.</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.url}</td>
                <td>{blog.likes}</td>
        </tr>    
    )
}

export default Blog