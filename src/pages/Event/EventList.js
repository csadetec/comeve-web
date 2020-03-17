import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import dateFormat from '../../utils/date'

function EventList() {
  const [events] = useState(JSON.parse(localStorage.getItem('events')))
  //const [guest] = useState([])
  let history = useHistory()

  useEffect(() => {
    document.title = 'Eventos'
   
  }, [])

  const timeFormat = (time) => {
    return time.slice(0, 5)

  }

  const handleClick = (id) => {
    history.push(`/eventos/editar/${id}`)
  }

  const title = (date, name, resource) => {
    
    let txt = ``
    +`Editar ${name} - ${dateFormat(date)}\n`
    
    txt += resource.map( r => {
      return `\n${r.name} - ${r.pivot.accept === 0 ? 'AGUARDANDO...' : 'ACEITO'}` 
    })
    /** */

    return txt
  }
  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12 border-bottom">
          <Link type="button" className="btn btn-indigo float-right" to='/eventos/cadastrar'>Cadastrar Evento</Link>

          <h2>Eventos</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Nome</th>
                <th scope="col">Local</th>
                <th scope="col">Solicitante</th>
              </tr>
            </thead>
            <tbody>
            
              {events && events.map(r =>
                <tr 
                  title={title(r.date, r.name,  r.resources)}
                  onClick={() => handleClick(r.id)} key={r.id} className="cursor-pointer">
                  <td>
                    <strong>{dateFormat(r.date)}</strong><br/> {timeFormat(r.start)} - {timeFormat(r.end)}
                  </td>
                  <td>{r.name}</td>
                  <td>{r.place_name}</td>
                  <td>
                    {r.guests.length === 0 ? r.user.name :    r.guests[0].name}                
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EventList