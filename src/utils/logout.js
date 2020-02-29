//import React from 'react'
//import  {Redirect} from 'react-router-dom'

const logout = () => {
  
  localStorage.clear()
  window.location.reload()
  /** */
  console.log('error logout')
}

export default logout