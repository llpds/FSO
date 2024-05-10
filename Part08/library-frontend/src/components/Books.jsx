import { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { updateCache } from '../utils/updateCache'

import BooksTable from './BooksTable'
import Notify from './Notify'

const Books = () => {
  const allG = 'all genres'
  const [message, setMessage] = useState(null)
  const [filter, setFilter] = useState(allG)
  const [genres, setGenres] = useState([])

  const queryVarGenre = filter === allG ? null : filter
  const client = useApolloClient()

  useSubscription( BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded

      const newGenres = addedBook.genres.filter(g => !genres.includes(g))
      if(newGenres.length > 0) setGenres(genres.concat(newGenres))

      if(addedBook.genres.includes(filter) || filter === allG)
        updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: queryVarGenre } }, addedBook)

      showMessage(`${addedBook.title} added`)
    }
  })

  const showMessage = (msgToShow) => {
    setMessage(msgToShow)
    setTimeout(() => {
      setMessage(null)
    },5000)
  }

  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: queryVarGenre },
    fetchPolicy: 'cache-and-network'
  })

  if (booksQuery.data === undefined) {
    return null
  }

  const books = booksQuery.data.allBooks

  if(genres.length === 0) setGenres(Array.from(new Set(books.flatMap(b => b.genres))).concat(allG))

  const btn = {
    'borderRadius': '5px',
    'backgroundColor': 'white',
    'padding': '5px 10px',
    'margin': '2px'
  }
  const active = { ...btn, 'border': '1px solid green', 'color': 'green' }
  const inactive = { ...btn, 'border': '1px solid #aaa', 'color': 'darkblue' }
  return (
    <div>
      <h2>books</h2>
      <Notify message = {message}/>
      <BooksTable books={books} />
      {genres.map((g,i) => <button style={ g===filter?active:inactive } onClick={() => setFilter(g)} key={i}>{g}</button>)}
    </div>
  )
}



export default Books