import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import ButtonMenu from './components/ButtonMenu'
import ProductsList from './components/ProductsList'
import { initializeGloves } from './reducers/glovesReducer'
import { initializeFacemasks } from './reducers/facemasksReducer'
import { initializeBeanies } from './reducers/beaniesReducer'
import './App.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeGloves())
    dispatch(initializeFacemasks())
    dispatch(initializeBeanies())
  }, [dispatch])
  
  return (
    <div>
      <Router>
        <ButtonMenu />
        <Container>
          <Switch>
            <Route path='/products/:id'>
              <ProductsList />
            </Route>
            <Route path='/products'>
              <h1>Simple Warehouse App</h1>
            </Route>
            <Route path='/'>
              <h1>Simple Warehouse App</h1>
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  )
}

export default App