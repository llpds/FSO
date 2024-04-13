import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

import BooksTable from './BooksTable'

const BooksRecommend = () => {

  const userQuery = useQuery(USER,{
    onCompleted:booksData => getBooksQuery({ variables: { genre: booksData.me.favoriteGenre } })
  })

  const [getBooksQuery, booksQuery] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'cache-and-network'
  })

  if(booksQuery.data === undefined) return null

  const books = booksQuery.data.allBooks
  const genre = userQuery.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: {genre && genre} </p>
      <BooksTable books={books} />
    </div>
  )
}



export default BooksRecommend