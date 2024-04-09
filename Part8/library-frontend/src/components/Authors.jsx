import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'

const Authors = () => {
  const token = window.localStorage.getItem('library-user-token')
  const authorsQuery = useQuery(ALL_AUTHORS)
  if (authorsQuery.data === undefined) {
    return null
  }
  const authors = authorsQuery.data.allAuthors
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount ? a.bookCount : 'not now'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <BirthYearForm  authors = { authors }/>}
    </div>
  )
}


export default Authors