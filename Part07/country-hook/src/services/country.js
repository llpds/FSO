import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

export const getCountryService = (name) => {
  const request = axios.get(`${baseUrl}/${name}`)
  return request.then(response => response.data)
}

