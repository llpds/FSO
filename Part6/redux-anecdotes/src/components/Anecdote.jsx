import PropTypes from 'prop-types'
import { vote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const Anecdote = ({anecdote}) => {
  const dispatch = useDispatch()

  return (
    <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
    </div>
  </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired
}

export default Anecdote