import { useState } from 'react'  
import Button from './elements/Button'
import Input from './elements/Input'
import personService from '../services/personAxios'
import preparePerson from '../services/preparePerson'


const PersonForm = ({persons, setPersons, setMessage}) => {

  // --------------------------  states --------------------------
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // --------------------------  actions  --------------------------
  const addName = (event) => {
    event.preventDefault()

    const newObject = preparePerson.validate({persons: persons, name: newName, number: newNumber})

    switch(newObject.status) {
      case 'err':
        alert(newObject.msg)
        break;
      case 'addPerson':
        addPerson(newObject.data)
        break;
      case 'changeNumber':
        if(window.confirm(`${newObject.data.name} is already added to phonebook, replace the old number with a new one?`)){
          changeNumber(newObject.data)
        }
        break;
      default:
        alert ('default')
    } 
  }

  const addPerson = (newObject) => {
    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`Added ${returnedPerson.name}`)
      }) 
  }

  const changeNumber = ({id,name, number}) => {
    personService
      .update(id,name , number)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`${returnedPerson.name} number has changed to ${returnedPerson.number}`)
      }) 
  }

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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