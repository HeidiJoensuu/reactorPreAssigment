import categoryService from '../services/category'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_GLOVES':
      return action.data
    default:
      return state
  }
}

export const initializeGloves = () =>{
  return async dispatch => {
    let gloves = null
    try {
      gloves = await categoryService.getGloves()
      gloves.forEach(element => {
        element.availability = 'searching...'
      });
      dispatch({
        type: 'INIT_GLOVES',
        data: gloves
      })
    } catch (error) {
      if (error.message !== 'Error: Request aborted'){
        console.log(error);
      }
    }
  }
}

export default reducer