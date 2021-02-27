import categoryService from '../services/category'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_FACEMASKS':
      return action.data
    default:
      return state
  }
}

export const initializeFacemasks = () =>{
  return async dispatch => {
    let facemasks = null
    try {
      facemasks = await categoryService.getFacemasks()
      facemasks.forEach(element => {
        element.availability = 'searching...'
      });
      dispatch({
        type: 'INIT_FACEMASKS',
        data: facemasks
      })
    } catch (error) {
      if (error.message !== 'Error: Request aborted'){
        console.log(error);
      }
    }
  }
}

export default reducer