import { useState } from 'react'
import Button from './elements/Button'
import Input from './elements/Input'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const BlogForm = ({ blogs, setBlogs, setMessage, blogFormRef, user }) => {

  // --------------------------  states --------------------------
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // --------------------------  submit  --------------------------
  const submitBlog = (event) => {
    event.preventDefault()

    const titleCorrespondence = blogs.find(blog => blog.title.toLowerCase() === newTitle.toLowerCase())
    const urlCorrespondence = blogs.find(blog => blog.url === newUrl)

    if(newTitle === '' || newAuthor === '' || newUrl.length < 5) {
      alert('Name, author and url must be filled. \n The URL must be at least 5 characters long.')
      return
    }

    if (titleCorrespondence){
      alert(`Title ${newTitle} is already added to phonebook write other`)
      setNewTitle('')
      return
    }

    if(urlCorrespondence) {
      alert(`${newUrl} is already added to phonebook and has ${urlCorrespondence.title} title`)
      setNewUrl('')
      return
    }

    addBlog({
      title: newTitle,
      url: newUrl,
      author: newAuthor,
      likes: 0
    })
  }

  // --------------------------  actions  --------------------------
  const addBlog = async (newObject) => {
    const addedBlog = await blogService.create(newObject)

    blogFormRef.current.toggleVisibility()
    const blogToConcat = { ...addedBlog, user: { username: user.username } } //wrong structure, w/o token
    setBlogs(blogs.concat(blogToConcat))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    showMessage(`Added ${addedBlog.title}`)
  }

  const showMessage = (msg) => {
    setMessage([msg, 'msg'])
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const showError = (msg) => {
    setMessage([msg, 'err'])
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return(
    <div>
      <h2>Add a new</h2>
      <form onSubmit = {submitBlog}>
        <Input text = 'Title' value = {newTitle} onChange = {(event) => setNewTitle(event.target.value)} />
        <Input text = 'Author' value = {newAuthor} onChange = {(event) => setNewAuthor(event.target.value)} />
        <Input text = 'Url' value = {newUrl} onChange = {(event) => setNewUrl(event.target.value)} />
        <Button text = "create" />
      </form>
    </div>
  )
}

//blogs, setBlogs, setMessage, blogFormRef, user
BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogForm