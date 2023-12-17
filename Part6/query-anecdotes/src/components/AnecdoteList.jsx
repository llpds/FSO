import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'
import { useDispatch } from 'react-redux'
import { setStatus } from '../reducers/notAvailableReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    setTimeout(()=>{
      dispatch(setStatus('notAvailable'))
    }, 1000)
    return false
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdotes:</h3>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList