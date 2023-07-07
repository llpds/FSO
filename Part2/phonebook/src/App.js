import { useState } from 'react'    
import Person from './components/Person'
import Form from './components/Form'

import './App.css'


const App = ({data}) => {

  const [persons, setPersons] = useState(data)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  // --------------------------  actions  --------------------------
  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }
    if(formError (newObject) === 'no errors'){
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')      
    } else {
      alert (formError (newObject) )
    }   
  }

  const formError = (newObject) => {
    if(newObject.name === '' || newObject.number === ''){
      return `both fields (name and number) must be filled`
    } else if(persons.find(person => person.name === newObject.name)){
      return`Name ${newObject.name} is already added to phonebook`
    } else if (persons.find(person => person.number === newObject.number)){
      return`Phone number ${newObject.number} is already added to phonebook and belongs to ${persons.find(person => person.number === newObject.number).name}`
    } else {
      return 'no errors'
    }  
  }



  // --------------------------  handles  --------------------------
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <p>debug name: {newName} phone: {newNumber} filter: {filter} <br /> !!!!Don't forget to remove this line in the final version!!!!</p>
      <h2>Phonebook</h2>
        filter shown with: <input id="personFilterField" value = {filter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
        <Form id="inputForm" addName = {addName} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
        <ul>
          {persons.filter(function(person){
                          return person.name.toLowerCase().includes(filter.toLowerCase())})
                  .map(person => <Person key = {person.id} name = {person.name} number = {person.number} />)}
        </ul>
    </div>
  )
}

export default App