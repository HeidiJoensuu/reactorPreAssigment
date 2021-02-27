import axios from 'axios'

const url = '/api/product/'

const getGloves = () => {
  const request = axios.get(`${url}gloves`)
  return request.then(response => response.data)
}

const getFacemasks = () => {
  const request = axios.get(`${url}facemasks`)
  return request.then(response => response.data)
}

const getBeanies = () => {
  const request = axios.get(`${url}beanies`)
  return request.then(response => response.data)
}

export default { getGloves, getFacemasks, getBeanies }