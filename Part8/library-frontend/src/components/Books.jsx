import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Books = () => {
  const allG = 'all genres'
  const [filter, setFilter] = useState(allG)
  const [genres, setGenres] = useState([])

  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: filter === allG ? null : filter },
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
  const active = {...btn, 'border': '1px solid green', 'color': 'green' }
  const inactive = {...btn, 'border': '1px solid #aaa', 'color': 'darkblue'}
  return (
    <div>
      <h2>books</h2>
      <BooksTable books={books} />
      {genres.map((g,i)=> <button style={ g===filter?active:inactive } onClick={()=>setFilter(g)} key={i}>{g}</button>)}
    </div>
  )
}



export default Books