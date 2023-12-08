import { useSelector} from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = () => {

  // const anecdotes = useSelector(({anecdotes, filter}) => anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))) 
  // Selector unknown returned a different result when called with the same parameters.
  // https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization

  const anecdotes = useSelector(state => state.anecdotes)
  const anecdotesFilter = useSelector(state => state.filter)
  const sortedFilterAnecdotes = [...anecdotes]
    .filter(a => a.content.toLowerCase().includes(anecdotesFilter.toLowerCase()))
    .sort((a,b) => b.votes - a.votes)

  return (
    <div>
      {sortedFilterAnecdotes.map(anecdote =>
       <Anecdote key={anecdote.id} anecdote = {anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList