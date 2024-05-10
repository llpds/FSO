import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import useNotificationShow from '../myHooks/useNotificationShow'

const Anecdote = ({anecdote}) => {
  const showNotification = useNotificationShow()
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
      showNotification(`anecdote '${updatedAnecdote.content}' voted `)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

Anecdote.propTypes={
  anecdote: PropTypes.object.isRequired
}

export default Anecdote