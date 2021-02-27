import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import glovesReducer from './reducers/glovesReducer'
import fasemasksReducer from './reducers/facemasksReducer'
import beaniesReducer from './reducers/beaniesReducer'
import manufacturerReducer from './reducers/manufacturerReducer'

const reducer = combineReducers({
  gloves: glovesReducer,
  facemasks: fasemasksReducer,
  beanies: beaniesReducer,
  manufacturer: manufacturerReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
export default store