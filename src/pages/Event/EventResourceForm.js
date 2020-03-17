import React, { useEffect } from 'react'


const EventResourceForm = () => {
  useEffect(() => {
    document.title = 'Recursos do Evento'
  })
  return(
    <h2>add recursos ao evento</h2>
  )
}

export default EventResourceForm