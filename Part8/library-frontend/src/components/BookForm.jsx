import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import Notify from './Notify'

const NewBook = () => {
  const [title, setTitle] = useState('title10')
  const [author, setAuthor] = useState('Robert Martin')
  const [published, setPublished] = useState('2002')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState(['classic'])
  const [err, setErr] = useState()

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (e) => {
      const msg = e.graphQLErrors.map(e => e.message).join('/n')
      const ext = ` INFO: ${e.graphQLErrors[0].extensions.error.message}`
      setErr(msg.concat(ext))
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
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
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