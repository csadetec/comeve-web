import React from 'react'
import  {Redirect} from 'react-router-dom'

const logout = () => {
  
  localStorage.clear()
  return(
    <Redirect  path='*' to="/" />
  )
}

export default logout