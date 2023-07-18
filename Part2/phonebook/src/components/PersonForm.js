import { useState } from 'react'  
import Button from './elements/Button'
import Input from './elements/Input'
import personService from './../services/person'


const PersonForm = ({persons, setPersons}) => {

  // --------------------------  states --------------------------
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // --------------------------  actions  --------------------------
  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      id: new Date().getTime(),
      name: newName,
      number: newNumber,
    }
    if(formError (newObject) === 'no errors'){
      personService
        .create(newObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')  
        })      
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

  // --------------------------  handlers  --------------------------
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return(
    <div>      
      <form onSubmit = {addName}>
        <Input text = 'name' newValue = {newName} handleAction = {handleNameChange} />
        <Input text = 'number' newValue = {newNumber} handleAction = {handleNumberChange} />
        <Button text = "add" />
      </form>
    </div>
  ) 
}

export default PersonForm