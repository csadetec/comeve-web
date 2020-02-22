import React from 'react'

function Alert(props) {
  return (
    <div className="alert alert-info mt-2" role="alert">
      {props.msg}
    </div>      
  )
}

export default Alert