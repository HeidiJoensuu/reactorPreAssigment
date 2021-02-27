import axios from 'axios'

const url = 'http://localhost:3001'

const getGloves = () => {
  const request = axios.get(`${url}/api/product/gloves`)
  return request.then(response => response.data)
}

const getFacemasks = () => {
  const request = axios.get(`${url}/api/product/facemasks`)
  return request.then(response => response.data)
}

const getBeanies = () => {
  const request = axios.get(`${url}/api/product/beanies`)
  return request.then(response => response.data)
}

export default { getGloves, getFacemasks, getBeanies }