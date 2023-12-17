import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import ServiceNotAvailable from './components/ServiceNotAvailable'
import { useSelector } from 'react-redux'


const App = () => {

  const status = useSelector(state => state.notAvailable)
  if (status === 'notAvailable') return (<ServiceNotAvailable />)

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
