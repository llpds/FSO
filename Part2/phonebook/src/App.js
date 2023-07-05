import { useState } from 'react'    
import Person from './components/Person'

import './App.css'

const App = () => {

  const startArr = [
    { name: 'Arto Hellas',}
  ]

  const [persons, setPersons] = useState(startArr)
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      id: persons.length + 1,
      name: newName,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
        <div>
          name: <input id = "newName" value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <Person key = {person.name} name = {person.name} />)}
        </ul>
    </div>
  )
}

export default App