import manufacturerService from '../services/manufacturer'
import _ from 'lodash'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_MANUFACTURER':
      return {...state, [action.name]: action.data}
    default:
      return state
  }
}

export const initializeManufacturer = (manufacturer) => {
  return async dispatch => {
    let rawData = null
    let processedData = {}
    try {
      while (rawData===null || rawData.response==="[]") {
        rawData = await manufacturerService.getManufacturer(manufacturer)
      if (rawData.response!=="[]") {
        rawData.response.forEach(product => {
          const rawList = product.DATAPAYLOAD.split(/[</>]/)
          const parsedList = _.without(rawList, "", "\n", "\n  ", "200", "AVAILABILITY", "CODE", "INSTOCKVALUE").toString()
          Object.assign(processedData, {[product.id]: parsedList})
        });
      }
      dispatch({
        type: 'INIT_MANUFACTURER',
        data: processedData,
        name: manufacturer
      })
      }
    } catch (error) {
      if (error.message !== 'Error: Request aborted'){
        console.log(error);
      }
    }
  }
}

export default reducer