import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'

function EventList() {

  const [events, setEvents] = useState([])
  //let cont = 1

  useEffect(() => {
    document.title = 'Eventos'
    async function loadEvents() {
      const response = await api.get('/events')

      setEvents(response.data)
      //console.log(response.data)
    }

    loadEvents()
  }, [])

  const dateFormat = (dateString) => {
    let d = new Date(dateString)
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
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
          <ul className="list-group">
            {events.map(r =>
              <li key={r.id} className="list-group-item">
                <div className="row">
                  <div className="col-md-4">
                    <h4>{r.name}</h4>
                    <p>{r.user.username} | {r.place.name}</p>
                  </div>
                  <div className="col-md-4">
                    list Recursos
                  </div>
                  <div className="col-md-4">
                  <sub className="float-right">{dateFormat(r.date)}</sub><br/>
                  <sub className="float-right">{r.start} - {r.end}</sub><br/>
                  <Link type="button" className="btn btn-outline-indigo float-right" to={`/eventos/editar/${r.id}`}><i className="fas fa-edit"></i>Editar</Link>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EventList