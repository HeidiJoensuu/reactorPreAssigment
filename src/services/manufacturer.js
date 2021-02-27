import axios from 'axios'

const url = 'http://localhost:3001'

const getManufacturer = (manufacturer) => {
  const request = axios.get(`${url}/api/manu/${manufacturer}`)
  return request.then(response => response.data)
}

export default { getManufacturer }