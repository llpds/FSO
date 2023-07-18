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

    const newObject = preparePerson({name: newName, number: newNumber})

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

  const preparePerson = ({name, number}) => {
      const numberCorrespondence  = persons.find(person => person.number === number)
      const nameCorrespondence = persons.find(person => person.name.toLowerCase() === name.toLowerCase())

      if(name === '' || number === '') return {
          status: 'err',
          msg: `both fields (name and number) must be filled`,
          data: undefined
        }
    
      if (numberCorrespondence) 
      return {
        status: 'err',
        msg: `Phone number ${number} is already added to phonebook and belongs to ${numberCorrespondence.name}`,
        data: undefined
      }  

      if(nameCorrespondence) 
        return {
          status: 'changeNumber',
          msg: `${nameCorrespondence.name} was changeda to ${number}`,
          data: {
            id: nameCorrespondence.id,
            name: nameCorrespondence.name,
            number: number
          }
        }

      return  { status: 'addPerson',
                msg: `${name} is added`,
                data: {
                  id: new Date().getTime(),
                  name: name,
                  number: number
                }
              }
  }

  const addPerson = (newObject) => {
    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')  
      }) 
  }

  const changeNumber = ({id,name, number}) => {
    personService
      .update(id,name , number)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')  
      }) 
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