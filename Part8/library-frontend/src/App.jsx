import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import BooksRecommend from './components/BooksRecommend'
import NavBar from './components/Navbar'

import LoginForm from './components/LoginForm'


const App = () => {
  const [token, setToken] = useState(null)

  // console.log('token', token)
  // console.log('window.localStorage', window.localStorage)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('library-user-token')
    if (loggedUserJSON) {
      setToken(loggedUserJSON)
    }
  }, [])

  return (
    <div>
      <NavBar token = {token} setToken={setToken}/>
      <Routes>
        <Route path="/" element={<Books/>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/newbook" element={token ? <BookForm /> : <Navigate replace to="/" />} />
        <Route path="/recommend" element={token ? <BooksRecommend /> : <Navigate replace to="/" />} />
        <Route path="/login" element={token ? <Navigate replace to="/" /> : <LoginForm setToken={setToken} />} />
      </Routes> 
    </div>
  )
}

export default App