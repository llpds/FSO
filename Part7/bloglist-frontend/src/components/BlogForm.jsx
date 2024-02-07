import { useState } from 'react'
// import Button from './elements/Button'
import Input from './elements/Input'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import  { createBlog } from '../reducers/blogReducer'
import { TextField, Box, Button } from '@mui/material'

const BlogForm = ({ blogFormRef }) => {
  // --------------------------  states --------------------------
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        autoComplete="off"
        onSubmit={submitBlog}
      >
        <TextField
          id="blogFormTitle"
          label="Title"
          variant="outlined"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          size = "small"
        />
        <TextField
          id="blogFormAuthor"
          label="Author"
          variant="outlined"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          size = "small"
        />
        <TextField
          id="blogFormUrl"
          label="Url"
          variant="outlined"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          size = "small"
        />
        <Button variant="outlined" color="primary" type="submit" size = "large">
          create
        </Button>
      </Box>

    </div>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}

export default BlogForm
