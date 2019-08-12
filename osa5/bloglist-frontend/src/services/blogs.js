import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getToken = () => {
  return token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const put = (object) => {
  const url = baseUrl + '/' + object.id

  const request = axios.put(url, object)
  return request.then(response => response.data)
}

const remove = (id) => {
  const url = baseUrl + '/' + id

  const config = {
    headers: { Authorization: token },
  }
  console.log(config)

  const request = axios.delete(url, config)
  return request.then(response => response.data)
}

export default { setToken, getToken, getAll, create, put, remove }