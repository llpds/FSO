import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/persons`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const destroy = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, name, number) => {
    const request = axios.put(`${baseUrl}/${id}`, {name: name, number: number})
    return request.then(response => response.data)
}

const exportedObj = {getAll, create, destroy, update} //prevent warning  eslint: Assign object to a variable before exporting as module default

export default exportedObj