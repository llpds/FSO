import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import blogService from './services/blog'
import Notification from './components/Notification'

import './App.css'


const App = () => {


  // --------------------------  states --------------------------
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>  
      
      <Notification message = {message}/>
      
      <h2>Add a new</h2>
      
      <BlogForm blogs = {blogs} setBlogs = {setBlogs} setMessage = {setMessage}/>
      
      <h2>Numbers</h2>
      
      <Blogs blogs = {blogs} setBlogs = {setBlogs}  setMessage = {setMessage}/>

    </div>
  )
}

export default App