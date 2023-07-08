import { useState } from 'react'    
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import './App.css'


const App = ({data}) => {

  // --------------------------  states --------------------------
  const [persons, setPersons] = useState(data)
  const [filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>  
      
      <Filter filter = {filter} setFilter = {setFilter}/>
      
      <h2>Add a new</h2>
      
      <PersonForm persons = {persons} setPersons = {setPersons} />
      
      <h2>Numbers</h2>
      
      <Persons persons = {persons} filter = {filter} />

    </div>
  )
}

export default App