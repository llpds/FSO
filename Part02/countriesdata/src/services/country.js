import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}


const exportedObj = {getAll} //prevent warning  eslint: Assign object to a variable before exporting as module default

export default exportedObj