import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'

function EventList() {

  const [events, setEvents] = useState([])
  let cont = 1 

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
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Usuario</th>
                <th scope="col">Nome</th>
                <th scope="col">Local</th>
                <th scope="col">Date</th>
                <th scope="col">Início</th>
                <th scope="col">Fim</th>
              </tr>
            </thead>
            <tbody>
              {events.map(r =>
                <tr key={r.id}>
                  <th scope="row">{cont++}</th>
                  <td>{r.user.username}</td>
                  <td>{r.name}</td>
                  <td>{r.place.name}</td>
                  <td>{dateFormat(r.date)}</td>
                  <td>{r.start}</td>
                  <td>{r.end}</td>
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