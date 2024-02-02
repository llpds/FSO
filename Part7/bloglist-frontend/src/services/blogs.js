import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
// const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const nullToken = () => {
  token = null
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async ( newBlog ) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blogToBack) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blogToBack.id}`, blogToBack, config)
  return response.data
}

const destroy = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default { getAll, create, update, destroy, setToken, nullToken }
