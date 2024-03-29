import PropTypes from 'prop-types'
import { vote } from '../reducers/anecdoteReducer'
import { showNnotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Anecdote = ({anecdote}) => {
  const dispatch = useDispatch()

  const likeSubmit = () => {
    dispatch(vote(anecdote))
    dispatch(showNnotification(`you voted "${anecdote.content}"`, 10))
  }
  return (
    <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={likeSubmit}>vote</button>
    </div>
  </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired
}

export default Anecdote