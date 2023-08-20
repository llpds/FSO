import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const exportedObj = {getAll, create} //prevent warning  eslint: Assign object to a variable before exporting as module default

export default exportedObj