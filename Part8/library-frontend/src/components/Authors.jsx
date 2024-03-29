import PropTypes from 'prop-types'
import BirthYearForm from './BirthYearForm'

const Authors = ({ authorsQuery }) => {
  
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
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm  authors = { authors }/>
    </div>
  )
}
Authors.propTypes = {
  authorsQuery: PropTypes.object
}

export default Authors