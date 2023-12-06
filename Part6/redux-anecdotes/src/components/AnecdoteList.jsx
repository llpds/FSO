import { useSelector} from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
       <Anecdote key={anecdote.id} anecdote = {anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList