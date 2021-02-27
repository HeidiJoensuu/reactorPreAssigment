import categoryService from '../services/category'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BEANIES':
      return action.data
    default:
      return state
  }
}

export const initializeBeanies = () =>{
  return async dispatch => {
    let beanies = null
    try {
      beanies = await categoryService.getBeanies()
      beanies.forEach(element => {
        element.availability = 'searching...'
      });
      dispatch({
        type: 'INIT_BEANIES',
        data: beanies
      })
    } catch (error) {
      if (error.message !== 'Error: Request aborted'){
        console.log(error);
      }
    }
  }
}

export default reducer