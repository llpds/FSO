import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import { updateCache } from '../utils/updateCache'

import Notify from './Notify'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [err, setErr] = useState()

  const [ createBook ] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS, variables: { genre: null } }, response.data.addBook)
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (e) => {
      let msg = e.graphQLErrors.map(e => e.message).join('/n')
      if(e.graphQLErrors[0]?.extensions?.error?.message)
        msg = msg.concat(` INFO: ${e.graphQLErrors[0].extensions.error.message}`)
      setErr(msg)
    },
    onCompleted: () => {
      setErr(null)
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    const publishedInt = Number(published)
    createBook({ variables: { title, published: publishedInt, genres, author } })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Notify errorMessage = {err}/>
      <form onSubmit={submit}>
        <div>
          title
          <input
            id="inputBookTitle"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="inputBookAuthor"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            id="inputBookPublished"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            id="inputBookGenre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook