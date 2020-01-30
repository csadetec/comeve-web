import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'

function EventForm() {

  const [name, setName] = useState('')
  const [place_id, setPlace_id] = useState('')
  const [date, setDate] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [places, setPlaces] = useState([])
  let history = useHistory()

  useEffect(() => {
    document.title = 'Cadastrar Evento'
    async function loadPlaces() {
      const { data } = await api.get('/places')

      setPlaces(data)
    }
    loadPlaces()
    /** */
  }, [])
  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    const obj = { name, place_id, date, start, end}
    
    const response = await api.post('/events', obj)
    //console.log(response)
    
    if(response.status === 200){
      history.push('/eventos/listar')
    }
    /** */

  }

  return (
    <div className="container pb-5">
      <div className="row mb-4">
        <div className="col-md-12 border-bottom">
          <h2>Cadastrar Evento</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form className="border border-light p-4" onSubmit={handleSubmit}>
            {/*
            <p className="h4 mb-4 text-center">Dados do Evento</p>*/}
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" className="form-control mb-4" placeholder="Nome do eventos .."
              value={name} onChange={e => setName(e.target.value)}
              required
            />

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="place">Local</label>
                <select value={place_id} onChange={e => setPlace_id(e.target.value)} className="form-control" required>
                  <option value="">Selecione</option>
                  {places.map(r => 
                    <option key={r.id} value={r.id}>{r.name}</option>
                   )}
                </select>
                </div>
              <div className="col-md-6">
                <label htmlFor="date">Data</label>
                <input type="date" id="date" className="form-control mb-4"
                  value={date} onChange={e => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row"> 
              <div className="col-md-6">
                <label htmlFor="start">Inicio</label>
                <input type="time" id="start" className="form-control mb-4"
                  value={start} onChange={e => setStart(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="end">Fim</label>
                <input type="time" id="end" className="form-control mb-4"
                  value={end} onChange={e => setEnd(e.target.value)}
                  required

                />
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-outline-indigo" type="submit">Salvar</button>
              <Link className="btn btn-outline-danger" type="submit" to="/eventos/listar">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EventForm