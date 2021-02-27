import axios from 'axios'

const url = 'https://reactorpreassigment.herokuapp.com/'

const getManufacturer = (manufacturer) => {
  const request = axios.get(`${url}/api/manu/${manufacturer}`)
  return request.then(response => response.data)
}

export default { getManufacturer }