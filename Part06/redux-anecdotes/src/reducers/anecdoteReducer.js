import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action){
      return action.payload
    },
    upddateAnecdote(state,action){
      const pl = action.payload
      return state.map(s => s.id === pl.id ? pl : s)
    },
    addAnecdote(state,action){
      state.push(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
}

export const vote = anecdote => async dispatch => {
    const updatedAnecdote = await anecdoteService.voteUp(anecdote)
    dispatch(upddateAnecdote(updatedAnecdote))
}

export const { upddateAnecdote, setAnecdotes, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer