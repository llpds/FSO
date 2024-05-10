import { useState, useEffect } from 'react'
import { getCountryService } from '../services/country'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect( () => {
    if(name !== ''){
      getCountryService(name)
        .then (res => {
          setCountry({
            data:{
              name: res.name.common,
              capital: res.capital[0],
              population: res.population,
              flag: res.flags.png
            },
            found: true})
        })
        .catch(e => setCountry({found: false}) )
    }
  },[name])

  return country
}