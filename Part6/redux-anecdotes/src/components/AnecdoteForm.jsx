import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNnotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(showNnotification(`you added "${newAnecdote.content}"`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input id ="input" name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm