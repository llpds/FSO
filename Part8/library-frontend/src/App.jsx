// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
// import NewBook from './components/NewBook'
import NavBar from './components/Navbar'
import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
query AllAuthors {
  allAuthors {
    name
    id
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    published
    id
    author
  }
}
`

const App = () => {
  const authorsQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)

  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/books" element={<Books booksQuery={booksQuery} />} />
        <Route path="/authors" element={<Authors authorsQuery={authorsQuery} />} /> 
      </Routes>

      {/* <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>       */}
      {/* <NewBook show={page === 'add'} /> */}
    </div>
  )
}

export default App