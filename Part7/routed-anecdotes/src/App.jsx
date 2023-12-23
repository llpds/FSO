import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'

import { initAnecdote } from './initAnecdote'


const App = () => {
  const [anecdotes, setAnecdotes] = useState(initAnecdote)

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Menu />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} /> 
        <Route path="/create" element = {<CreateNew  addNew={addNew}/>} />
        <Route path="/about" element={<About />} /> 
       </Routes>
      
      <Footer />
    </div>
  )
}

export default App
