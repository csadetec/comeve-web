import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import { loadEvents } from '../utils/load'

import Alert from './default/Alert'
import Loading from './default/Loading'


import './Event.css'

function EventForm(props) {

  const [name, setName] = useState('')
  const [place_id, setPlace_id] = useState('')
  const [date, setDate] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [places] = useState(JSON.parse(localStorage.getItem('places')))
  const [resource] = useState(JSON.parse(localStorage.getItem('resources')))
  const [searchResource] = useState('')
  const [itensResources, setItensResources] = useState([])
  const [h2, setH2] = useState('Cadastrar Evento')
  const [alert, setAlert] = useState(false)
  const [loading, setLoagind] = useState(true)
  const [btnLabel, setBtnLabel] = useState('Salvar')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const { id } = props.match.params
  let history = useHistory()

  useEffect(() => {


    if (id === undefined) {
      document.title = 'Cadastrar Evento'
      setLoagind(false)
      return;
    }
    document.title = 'Editar Evento'
    setH2('Editar Evento')
    async function loadEvent() {
      const { data } = await api.get(`/events/${id}`)

      setName(data.name)
      setPlace_id(data.place_id)
      setDate(data.date)
      setStart(data.start)
      setEnd(data.end)
      setItensResources(data.resources)
      setLoagind(false)
      console.log(data.resources)
    }
    loadEvent()



  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    const obj = { name, place_id, date, start, end, itensResources }
    setBtnDisabled(true)
    setBtnLabel('Salvando ...')
    //return;
    if (id) {
      const { status } = await api.put(`/events/${id}`, obj)
      //     console.log(data);
      if (status === 200) {
        loadEvents()
        setAlert('Atualizado com Sucesso!')
        setBtnDisabled(false)
        setBtnLabel('Salvar')

      }
      return;
    }

    const { status } = await api.post('/events', obj)

    if (status === 201) {
      await loadEvents()
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

    let testFind = itensResources.filter((r) => {
      return r.id === itemSelected
    })

    if (testFind.length === 0) {
      setItensResources([...itensResources, obj[0]])

    }
  }

  const handleClick = (id) => {
    ///console.log('excluir resource', id)
    let filter = itensResources.filter(r => {
      return r.id !== id
    })

    setItensResources(filter)
    //console.log(filter)

  }

  return (
    <>
      {loading ?
        <Loading /> :
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 border-bottom">
              <h2>{h2}</h2>
            </div>
          </div>
          <div className="row">
            {alert &&
              <Alert msg={alert} />
            }
          </div>
          <div className="row border border-light p-4">

            <div className="col-md-7">
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
                  <button className="btn btn-outline-indigo" type="submit" disabled={btnDisabled}>{btnLabel}</button>
                  <Link className="btn btn-outline-danger" type="submit" to="/eventos/listar">Fechar</Link>
                </div>
              </form>
            </div>
            <div className="col-md-5 border-left">
              <h4>
                Recursos
              </h4>
              <table className="table">
                {/*}
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                      */}
                <tbody>
                  {itensResources.map(r => 
                    <tr key={r.id} className="cursor-pointer" onClick={() => handleClick(r.id)}>
                      <td>{r.name}</td>
                      <td>{r.sector.name}</td>
                      <td><i className="fas fa-times-circle float-right"></i></td>
                    </tr>
                  )}
                </tbody>

              </table>
              
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default EventForm