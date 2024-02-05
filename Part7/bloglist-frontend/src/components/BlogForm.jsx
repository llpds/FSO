import { useState } from 'react'
import Button from './elements/Button'
import Input from './elements/Input'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import  { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  // --------------------------  states --------------------------
  const [newTitle, setNewTitle] = useState('rrrrr')
  const [newAuthor, setNewAuthor] = useState('rrrrr')
  const [newUrl, setNewUrl] = useState('rrrrr')

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const addBlog = async (newBlog) => {
    dispatch(createBlog(newBlog))
    blogFormRef.current.toggleVisibility()
  }

  // --------------------------  submit  --------------------------
  const submitBlog = (event) => {
    event.preventDefault()
    if (blogs.length > 0) {
      const titleCorrespondence = blogs.find(
        (blog) => blog.title.toLowerCase() === newTitle.toLowerCase()
      )
      const urlCorrespondence = blogs.find((blog) => blog.url === newUrl)

      if (titleCorrespondence) {
        alert(`Title ${newTitle} is already added to phonebook write other`)
        setNewTitle('')
        return
      }

      if (urlCorrespondence) {
        alert(
          `${newUrl} is already added to phonebook and has ${urlCorrespondence.title} title`
        )
        setNewUrl('')
        return
      }
    }

    if (newTitle === '' || newAuthor === '' || newUrl.length < 5) {
      alert(
        'Name, author and url must be filled. \n The URL must be at least 5 characters long.'
      )
      return
    }

    addBlog({
      title: newTitle,
      url: newUrl,
      author: newAuthor,
      likes: 0,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="blogFormTest">
      <h2>Add a new</h2>
      <form onSubmit={submitBlog}>
        <Input
          data-testid="titleTest"
          text="Title"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <Input
          data-testid="authorTest"
          text="Author"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
        />
        <Input
          data-testid="urlTest"
          text="Url"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
        />
        <Button text="create" />
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}

export default BlogForm
