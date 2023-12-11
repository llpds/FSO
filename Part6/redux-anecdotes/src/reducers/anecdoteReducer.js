import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action){
      return action.payload
    },
    vote(state,action){
      const id = action.payload
      return state.map(s => s.id === id ? {...s, votes: s.votes + 1} : s)
    },
    createAnecdote(state,action){
      state.push(action.payload)
    }
  }
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer