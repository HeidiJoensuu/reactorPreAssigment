import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useScrollPercentage } from 'react-scroll-percentage'
import './ProductsList.css'
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress 
 } from '@material-ui/core'
import 'react-virtualized/styles.css'
import { initializeManufacturer } from '../reducers/manufacturerReducer'

const ProductsList = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const products = useSelector(state => state[id])
  const manufacturerData = useSelector(state => state["manufacturer"])
  const chunkki = _.chunk(products, 25)
  let producktKeys = null

  const [index, setIndex] = useState(0)
  const [producktTableCells, setProducktTableCells] = useState([])
  const [ref, percentage] = useScrollPercentage()
  const [manufacturers, setManufacturers] = useState([])
  

  try {
    if (products.length !== 0) {
      producktKeys = _.without(Object.keys(products[0]), 'type')
    }
  } catch (error) {
    console.log(error);
  }

  if (manufacturers.length === 0 && products.length !== 0) {
    try {
      let manuList = []
        products.forEach(product =>{
          manuList.push(product.manufacturer)
        })
      manuList = _.uniq(manuList)
      setManufacturers(manuList)
    } catch (error) {
      console.log(error);
    }
  }

  if (producktTableCells.length === 0 && products.length !== 0) {
    try {
      setProducktTableCells([...producktTableCells, ...chunkki[index]])
      setIndex(i => i+1)
    } catch (error) {
      console.log("ERROR: ",error);
    }
  }
  if (products && producktTableCells.length !== 0 && products[0].type !== producktTableCells[0].type){
    setProducktTableCells([...chunkki[0]])
    setIndex(1)
  }

  useEffect(() => {
    if (Math.round(percentage * 100) >= 70){
      if ((products.length) > producktTableCells.length  && index < chunkki.length ) {
        try {
          setProducktTableCells([...producktTableCells, ...chunkki[index]])
          setIndex(i => i+1)
        } catch (error) {
          console.log("ERROR: ",error);
        }
      }
    }
  }, [percentage, products])

  useEffect(() => {
    if (manufacturers.length !== 0){
      for (const m of manufacturers){
        dispatch(initializeManufacturer(m))
      }
    }
  }, [manufacturers])

  useEffect(() => {
    try {
      if (Object.keys(manufacturerData).length !== 0){
        producktTableCells.forEach(product => {
          if (product["availability"] === 'searching...'){
            if (manufacturerData[product.manufacturer] && Object.keys(manufacturerData[product.manufacturer]).length !== 0){
              product["availability"] = manufacturerData[product.manufacturer][(product.id).toUpperCase()]
            }
          }
        })
        setProducktTableCells([...producktTableCells])
      }
    } catch (error) {
      console.log(error);
    }
  }, [manufacturerData, manufacturers, products])

  return (
    <div ref={ref}> 
      <h2 className="productTitle">{id}</h2>      
      {producktKeys && producktTableCells
      ? <>
          <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  {producktKeys.map(key => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {producktTableCells.map(product => (
                  <TableRow key={product.id}>
                    {producktKeys.map(key => (
                      <TableCell key={key ? product[key] : "undefined"}>{product[key]}</TableCell>
                    ))}
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="loading"><CircularProgress /></div>
        </>
      : <div className="loading"><CircularProgress /></div>
      }
    </div>
  )
}

export default ProductsList