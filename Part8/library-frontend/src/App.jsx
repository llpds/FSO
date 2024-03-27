// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import NavBar from './components/Navbar'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'


const App = () => {
  const authorsQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)

  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Books booksQuery={booksQuery} />} />
        <Route path="/authors" element={<Authors authorsQuery={authorsQuery} />} />
        <Route path="/newbook" element={<NewBook />} />
        
      </Routes>

      {/* <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>       */}
      {/*  */}
    </div>
  )
}

export default App