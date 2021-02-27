
import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';
import './ButtonMenu.css';


const ButtonMenu = () => {
  const history = useHistory()
  const [value, setValue] = React.useState('recents')

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className="bottomNavigation"
      >
        <BottomNavigationAction label="Gloves" onClick={() => history.push('/products/gloves')} />
        <BottomNavigationAction label="Facemasks" onClick={() => history.push('/products/facemasks')} />
        <BottomNavigationAction label="Beanies" onClick={() => history.push('/products/beanies')} />
      </BottomNavigation>
    </div>
  )
}
export default ButtonMenu