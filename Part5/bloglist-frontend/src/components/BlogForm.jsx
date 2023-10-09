import { useState } from 'react'  
import Button from './elements/Button'
import Input from './elements/Input'
import blogService from '../services/blogs'


const BlogForm = ({blogs, setBlogs, setMessage}) => {

  // --------------------------  states --------------------------
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // --------------------------  submit  --------------------------
  const submitBlog = (event) => {
    event.preventDefault()
    const titleCorrespondence = blogs.find(blog => blog.title.toLowerCase() === newTitle.toLowerCase())
    const urlCorrespondence = blogs.find(blog => blog.url === newUrl)

    if(newTitle === '' || newAuthor === '' || newUrl === '') {
      alert("all fields (name, author and url) must be filled")
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
      author: newAuthor,
      url: newUrl,
      likes: 0
    })
  }

  // --------------------------  actions  --------------------------
  const addBlog = (newObject) => {
    blogService
      .create(newObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        showMessage(`Added ${returnedBlog.title}`)
      })
      .catch(error => {
        console.log('error', error.response.data.error)
        showError(error.response.data.error)
      })
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
      <form onSubmit = {submitBlog}>
        <Input text = 'Title' value = {newTitle} onChange = {(event) => setNewTitle(event.target.value)} />
        <Input text = 'Author' value = {newAuthor} onChange = {(event) => setNewAuthor(event.target.value)} />
        <Input text = 'Url' value = {newUrl} onChange = {(event) => setNewUrl(event.target.value)} />
        <Button text = "create" />
      </form>
    </div>
  ) 
}

export default BlogForm