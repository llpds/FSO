import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationShow } from '../NotificationContext'
import Button from './elements/Button'
import Input from './elements/Input'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({ blogFormRef }) => {
  // --------------------------  states --------------------------
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const showNotification = useNotificationShow()
  const showMessage = (msg) => showNotification([msg, 'msg'])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  if(result.isLoading) { return <div> Loading data...</div> }
  const blogs = result.data
console.log('blogsform', blogs)

  const addBlog = async (newBlog) => {
    newBlogMutation.mutate( newBlog )
    blogFormRef.current.toggleVisibility()
    showMessage(`Added ${newBlog.title}`)
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

//blogs, setBlogs, setMessage, blogFormRef, user
BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}

export default BlogForm
