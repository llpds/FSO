import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken2 = (newToken) => {
  token = `Bearer ${newToken}`
}

const nullToken = () => {
  token = null
}

export const getNotes = () => {
  return axios.get(baseUrl).then(res => res.data)
}


export const createBlog = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response =  axios.post(baseUrl, newBlog, config)
  console.log('response.data', response.data)
  return response.data
}

export default { setToken2 }