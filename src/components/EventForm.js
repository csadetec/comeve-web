import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'

import './EventForm.css'

function EventForm(props) {

  const [name, setName] = useState('')
  const [place_id, setPlace_id] = useState('')
  const [date, setDate] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [places, setPlaces] = useState([])
  const [resource, setResources] = useState([])
  const [searchResource] = useState('')
  const [itemsResources, setItemsResources] = useState([])
  const [h2, setH2] = useState('Cadastrar Evento')
  const [alert, setAlert] = useState(false)
  const { id } = props.match.params
  let history = useHistory()

  useEffect(() => {

    if (id === undefined) {
      document.title = 'Cadastrar Evento'
      return;
    }
    document.title = 'Editar Evento'
    setH2('Editar Evento')
    async function loadEvent() {
      const { data } = await api.get(`/events/${id}`)
      setName(data[0].name)
      setPlace_id(data[0].place_id)
      setDate(data[0].date)
      setStart(data[0].start)
      setEnd(data[0].end)
      setItemsResources(data[0].resource)
      //console.log(data)
      //console.log('editar evento')
    }
    loadEvent()



  }, [id])

  useEffect(() => {

    async function loadPlaces() {
      const { data } = await api.get('/places')

      setPlaces(data)
    }
    async function loadResources() {
      const { data } = await api.get('/resources')
      setResources(data)
    }
    loadPlaces()
    loadResources()
    /** */
  }, [])
  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    const obj = { name, place_id, date, start, end, itemsResources }
    //console.log(obj)

    if (id) {
      const { status } = await api.put(`/events/${id}`, obj)

      if (status === 200) {
        setAlert('Atualizado com Sucesso!')
        //console.log('update com sucess')
        //alert('teste')
      }

      return;
    }

    const response = await api.post('/events', obj)
    console.log(response)

    if (response.status === 200) {
      history.push(`/eventos/listar`)
    }

  }

  async function handleSelectResource(e) {
    //await setSearchResource(e.target.value)
    setAlert(false)
    let itemSelected = parseInt(e.target.value)
    let obj = resource.filter((r) => {
      return r.id === itemSelected
    })

    let testFind = itemsResources.filter((r) => {
      return r.id === itemSelected
    })

    if (testFind.length === 0) {
      setItemsResources([...itemsResources, obj[0]])

    }
  }

  const deleteResource = (id) => {
    ///console.log('excluir resource', id)
    let filter = itemsResources.filter( r => {
      return r.id !== id
    })

    setItemsResources(filter)
    //console.log(filter)

  }

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-12 border-bottom">
          <h2>{h2}</h2>
        </div>
      </div>
      <div className="row">
        {alert &&
          <div className="alert alert-success col-md-12" role="alert">
            {alert}
          </div>
        }
      </div>
      <div className="row border border-light p-4">

        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
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
            <div className="row">
              <div className="col-md-12">
                <select value={searchResource} className="form-control mb-4" onChange={handleSelectResource} >
                  <option value="">SELECIONE O RECURSO</option>
                  {resource.map(r =>
                    <option key={r.id} value={r.id}>{r.name}</option>
                  )}

                </select>
              </div>
            </div>
            <div className="text-left">
              <button className="btn btn-outline-indigo" type="submit">Salvar</button>
              <Link className="btn btn-outline-danger" type="submit" to="/eventos/listar">Fechar</Link>
            </div>
          </form>
        </div>
        <div className="col-md-4 border-left">
          <h4>
            Recursos
          </h4>
          <ul className="list-group">
            {itemsResources.map(r =>
              <li key={r.id} className="list-group-item cursor-pointer" onClick={() => deleteResource(r.id)} title="Retirar Recurso">
                {r.name}
                <i className="fas fa-times-circle float-right"></i>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EventForm