import { useState } from 'react'

const Show = ({anecdote, votes, title}) => (
  <div>
    <h2>{title}</h2>
    <p>{anecdote}</p>
    <p>has {votes} votes </p>
  </div>
)

const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}> {text} </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const arrBlank = new Uint8Array(anecdotes.length)
  /*  
      Creates an array of 8-bit unsigned integers, according with anecdotes array length.
      The contents are initialized to 0. 
      Alternative: Array(n).fill(0)
  */

  const [votes, setVotes] = useState(arrBlank)
  const [selected, setSelected] = useState(0)
  const [topRated, setTopRated] = useState(0)  

  const randAnecdote = () => {
      let rand = Math.floor (Math.random() * anecdotes.length)
      if (rand === selected) rand = Math.floor(anecdotes.length /(rand + 1))-1 //exclusion of consecutive repetitions
      setSelected(rand)
  }

  const incrVote = () => {
    const updVotes = [...votes]
    updVotes[selected] += 1
    setVotes(updVotes)
//    setTopRated(updVotes.indexOf(Math.max(...updVotes)))  //calculates max index as the topRated anecdote position only when VOTE button pressed
    if(votes[topRated] < updVotes[selected]) setTopRated(selected) // checks if topRated anecdote is still top rated only when VOTE button pressed
    console.log(updVotes)
  }

//  const topR = votes.indexOf(Math.max(...votes)) /calculates max index as the topRated anecdote position on each render

  return (
    <div>
      <Show anecdote = {anecdotes[selected]} votes = {votes[selected]} title = 'Anecdote of the day'/>
      <Button handleClick={incrVote} text="vote" />
      <Button handleClick={randAnecdote} text="next anecdote" />
      <Show anecdote = {anecdotes[topRated]} votes = {votes[topRated]} title = 'Anecdote with most votes'/>
    </div>
  )
}

export default App