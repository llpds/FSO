import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import countryService from './services/country'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService.getAll().then(c => setCountries(c))
  }, [])

  return (
    <div>
        <Filter text="find countries" 
                value = {Array.isArray(filter)?filter[1]:filter} 
                onChange = {(event) => setFilter(event.target.value)}/>

        <Countries  countries = {countries} 
                    filter = {filter}
                    setFilter = {setFilter} />
    </div>
  )
}
export default App