import { useState } from 'react'    
import Person from './components/Person'
import Form from './components/Form'

import './App.css'



const App = ({data}) => {

  const [persons, setPersons] = useState(data)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }
    
    if(newObject.name === '' || newObject.number === ''){
      alert(`both fields (name and number) must be filled`)
    } else if(persons.find(person => person.name === newObject.name)){
      alert(`Name ${newObject.name} is already added to phonebook`)
    } else if (persons.find(person => person.number === newObject.number)){
      alert(`Phone number ${newObject.number} is already added to phonebook and belongs to ${newObject.name}`)
    } else {
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')      
    }    
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <p>debug name: {newName} phone: {newNumber} </p>
      <h2>Phonebook</h2>
        <Form addName = {addName} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <Person key = {person.id} name = {person.name} number = {person.number} />)}
        </ul>
    </div>
  )
}

export default App