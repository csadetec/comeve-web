import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import { loadEvents } from '../utils/load'

import Alert from './default/Alert'
import Loading from './default/Loading'


import './Event.css'

function EventForm(props) {

  const [event, setEvent] = useState({
    name: '',
    place_id: '',
    date: '',
    start: '',
    end: '',
    resources:[]
  })

  const [places] = useState(JSON.parse(localStorage.getItem('places')))
  const [resources] = useState(JSON.parse(localStorage.getItem('resources')))
  const [h2, setH2] = useState('Cadastrar Evento')
  const [alert, setAlert] = useState(false)
  const [loading, setLoagind] = useState(true)
  
  const [btn, setBtn] = useState({label:'Salvar', disabled:false  })  

  const { id } = props.match.params
  let history = useHistory()

  useEffect(() => {
    if (id === undefined) {
      document.title = 'Cadastrar Evento'
      setLoagind(false)
      return;
    }
    document.title = `Editar Evento ${id}`
    setH2(`Editar Evento - ${id}`)
    async function load() {
      const { data } = await api.get(`/events/${id}`)
      console.log(data)
    
      setEvent(data)
      setLoagind(false)

      //console.log(data.resources)
    }
    load()



  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()

    setBtn({label:'Salvando...', disabled:true})
    //return;
    if (id) {
      const { status } = await api.put(`/events/${id}`, event)
      //     console.log(data);
      if (status === 200) {
        loadEvents()
        setAlert('Atualizado com Sucesso!')
        setBtn({label:'Salvar', disabled:false})

       

      }
      return;
    }

    const { status } = await api.post('/events', event)

    if (status === 201) {
      await loadEvents()
      history.push(`/eventos/listar`)
    }

  }

  async function handleAddResource(e) {

    
    let itemSelected = parseInt(e.target.value)
    let obj = resources.filter((r) => {
      return r.id === itemSelected
    })

    let testFind = event.resources.filter((r) => {
      return r.id === itemSelected
    })


    if (testFind.length === 0) {

      let myResources = ([...event.resources, obj[0]])
      setEvent({...event, resources:myResources})
      //setEvent({...event,  obj[0]])

    }
    /** */
  }

  const handleExcludeResource = (id) => {
    console.log('excluir resource', id)
    console.log(event.resources)
    
    let filter = event.resources.filter(r => {
      return r.id !== id
    })

    setEvent({...event, resources: filter})
    //console.log(filter)
    /** */

  }

  const handleAccept = (id) => {
    console.log('Aceitar Recurso')
  }
  const handleDecline = (id) => {
    console.log('negar recurso')
  }

  const updateField = e => {
    setEvent({...event, [e.target.name]: e.target.value})
    console.log(event)
  }

  return (
    <>
      {loading ?
        <Loading /> :
        <div className="container-fluid">
          <div className="row mb-4 border-bottom">
            <div className="col-md-6">
              <h2>{h2}</h2>
            </div>
            <div className="col-md-6 text-right">
              {event.user.name && `Criador do Evento: ${event.user.name}`}
              <br/>
              {event.created_at && `Criação: ${event.created}`}
            </div>
          </div>
          <div className="row">
            {alert &&
              <Alert msg={alert} />
            }
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row border border-light p-4">
              <div className="col-md-6">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" className="form-control mb-4" placeholder="Nome do eventos .."
                  value={event.name} onChange={updateField}
                  required
                />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="place">Local</label>
                    <select value={event.place_id} onChange={updateField} className="form-control" required>
                      <option value="">Selecione</option>
                      {places.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="date">Data</label>
                    <input type="date" id="date" className="form-control mb-4"
                      value={event.date} onChange={updateField}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="start">Inicio</label>
                    <input type="time" id="start" className="form-control mb-4"
                      value={event.start} onChange={updateField}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="end">Fim</label>
                    <input type="time" id="end" name="end" className="form-control mb-4"
                      value={event.end} onChange={updateField}
                      required

                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <select  className="form-control mb-4" onChange={handleAddResource} >
                      <option value="">SELECIONE O RECURSO</option>
                      {resources.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}

                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-5 border-left">
                <h4>
                  Recursos
              </h4>
                <table className="table">
                  <tbody>
                    {event.resources.map(r =>
                      <tr key={r.id} >
                        <td>          {r.name}
                        </td>
                        <td>{r.sector.name}</td>
                        <td className="cursor-pointer" onClick={() => handleExcludeResource(r.id)} title="Excluir Recurso">
                          <i className="far fa-times-circle"></i>
                        </td>
                        <td className="cursor-pointer" title="Aprovar Recurso" onClick={() => handleAccept(r.id)}>
                          <i className="far fa-thumbs-up"></i>
                        </td>
                        <td className="cursor-pointer" title="Negar Recurso" onClick={() => handleDecline(r.id)}>
                          <i className="far fa-thumbs-down"></i>
                        </td>

                      </tr>
                    )}
                  </tbody>

                </table>

              </div>
              <div className="row">
                <div className="col-md-12 ml-2">
                  <button className="btn btn-outline-indigo" type="submit" disabled={btn.disabled}>{btn.label}</button>
                  <Link className="btn btn-outline-danger" type="submit" to="/eventos/listar">Fechar</Link>
                </div>
              </div>

            </div>
          </form>

        </div>
      }
    </>
  )
}

export default EventForm