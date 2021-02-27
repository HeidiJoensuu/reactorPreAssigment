import axios from 'axios'

const url = '/api/manu/'

const getManufacturer = (manufacturer) => {
  const request = axios.get(`${url}${manufacturer}`)
  return request.then(response => response.data)
}

export default { getManufacturer }