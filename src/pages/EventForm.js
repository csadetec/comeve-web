import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import { loadEvents } from '../utils/load'

import Alert from '../components/Alert'
import Loading from '../components/Loading'


import './Event.css'

function EventForm(props) {
  /*
  const [event, setEvent] = useState({
    name: '',
    place_id: '',
    date: '',
    start: '',
    end: '',
    user: '',
    resources: []
  })
  /** */
  const [event, setEvent] = useState({
    name: 'Livro dos Ávos | Fundamental 2',
    amount_people:50,
    place_id: 1,
    date: '2020-12-12',
    start: '15:00',
    end: '19:00',
    user: { name: 'Gerente Name', id: 1 },
    guests: [],
    resources: []
  })


  const [logged] = useState(JSON.parse(localStorage.getItem('logged')))
  const [places] = useState(JSON.parse(localStorage.getItem('places')))
  const [resources] = useState(JSON.parse(localStorage.getItem('resources')))
  const [guest] = useState(JSON.parse(localStorage.getItem('users')))
  const [disabled, setDisable] = useState(false)

  const [h2, setH2] = useState('Cadastrar Evento')
  const [alert, setAlert] = useState(false)
  const [loading, setLoagind] = useState(true)

  const [btn, setBtn] = useState({ label: 'Salvar', disabled: false })

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
      data.resources.map(r =>
        r.accept = r.pivot.accept
      )
      data.guests = [{ id: 1, name: 'teste' }]
      if (logged.id !== data.user_id) {
        setDisable(true)
      }
      setEvent(data)
      setLoagind(false)
      // console.log(event.resources)
      //console.log(event.guests)
      //console.log(data.resources)
    }
    load()
  }, [id, logged.id])

  async function handleSubmit(e) {
    e.preventDefault()

    console.log(event)
    let txt = 'Dados Q serão salvos do evento'
    txt += `${JSON.stringify(event)}`
    //txt += `\n${event}`
    setAlert(txt)
    txt = null
    return
    setBtn({ label: 'Salvando...', disabled: true })
    //return;
    if (id) {
      const { status, data } = await api.put(`/events/${id}`, event)
      console.log(data);

      if (status === 200) {
        loadEvents()
        setAlert('Atualizado com Sucesso!')
        setBtn({ label: 'Salvar', disabled: false })
      }
      return;
    }

    const { status } = await api.post('/events', event)
    //console.log
    if (status === 201 || status === 200) {
      await loadEvents()
      history.push(`/eventos/listar`)
    }

  }

  async function handleAddGuest(e) {

  }
  const handleExludeGuest = (id) => {
    console.log('exclude ', id)
  }

  async function handleAddResource(e) {
    let resource_id = parseInt(e.target.value)

    let resourceSelected = resources.filter((r) => {
      return r.id === resource_id

    })

    let resourceVerifySelected = event.resources.filter((r) => {
      return r.id === resource_id
    })
    if (resourceVerifySelected.length === 0) {
      resourceSelected = resourceSelected[0];
      //let er = {accept: 0}

      resourceSelected = { ...resourceSelected, accept: 0 };
      let myResources = ([...event.resources, resourceSelected])
      await setEvent({ ...event, resources: myResources })

    } else {
      //await window.alert(`Recurso já foi adicionando`)
      console.log('ja foi adicionando')
    }

    /** */
  }

  const handleExcludeResource = (id) => {
    setAlert(false)
    let filter = event.resources.filter(r => {
      return r.id !== id
    })

    setEvent({ ...event, resources: filter })

  }

  const handleAcceptDecline = (id, sector_name, accept) => {
    setAlert(false)
    //console.log(accept)
    if (logged.sector_name !== sector_name) {
      window.alert(`Entre em contato com - ${sector_name}\nPara realizar está ação`)
      return;
    }

    let myResources = event.resources.map(r => {
      if (r.id === id) {
        r.accept = accept === 1 ? 0 : 1
      }
      return r
    })

    setEvent({ ...event, resources: myResources })

  }

  const updateField = (e) => {
    setAlert(false)
    setEvent({ ...event, [e.target.name]: e.target.value })
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
              <br />
              {event.created_at && `Criação: ${event.created_at}`}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {alert &&
              <Alert msg={alert} />
            }
            <div className="row border border-light p-4">
              <div className="col-md-5">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" className="form-control mb-4" placeholder="Nome do eventos .."
                  value={event.name} onChange={updateField} disabled={disabled}
                  required
                />
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="amount_people">Qtd Pessoas</label>
                    <input type="number" name="amount_people" className="form-control mb-4" 
                      value={event.amount_people} onChange={updateField} disabled={disabled}
                      required
                    />

                  </div>
                  <div className="col-md-6">
                    <label htmlFor="date">Presença dos Pais</label>
                    <input type="date" id="date" name="date" className="form-control mb-4"
                      value={event.date} onChange={updateField} disabled={disabled}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="place">Local</label>
                    <select value={event.place_id} name="place_id" onChange={updateField} className="form-control" disabled={disabled} required>
                      <option value="">Selecione</option>
                      {places.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="date">Data</label>
                    <input type="date" id="date" name="date" className="form-control mb-4"
                      value={event.date} onChange={updateField} disabled={disabled}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="start">Inicio</label>
                    <input type="time" id="start" name="start" className="form-control mb-4"
                      value={event.start} onChange={updateField} disabled={disabled}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="end">Fim</label>
                    <input type="time" id="end" name="end" className="form-control mb-4"
                      value={event.end} onChange={updateField} disabled={disabled}
                      required

                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <select value="" className="form-control mb-4" onChange={handleAddResource} disabled={disabled} >
                      <option value="">SELECIONE O RECURSO</option>
                      {resources.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}

                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-5 border-left">
                <h5>
                  Recursos
                </h5>
                <table className="table">
                  <tbody>
                    {event.resources.map(r =>
                      <tr key={r.id} >
                        <td>{r.name}
                        </td>
                        <td>{r.sector_name}</td>
                        {event.user.id === logged.id &&
                          <td className="cursor-pointer" onClick={() => handleExcludeResource(r.id)} title="Excluir Recurso">
                            <i className="far fa-times-circle"></i>
                          </td>
                        }
                        <td className="cursor-pointer"
                          title={r.accept === 1 ? 'Negar Recurso' : 'Aceitar Recurso'}
                          onClick={() => handleAcceptDecline(r.id, r.sector_name, r.accept)}>
                          <i className={r.accept === 1 ? 'far fa-thumbs-up like' : 'far fa-thumbs-down deslike'}></i>
                        </td>

                      </tr>
                    )}
                  </tbody>

                </table>

              </div>
              <div className="col-md-2 text-right">
                <ul className="list-group">
                  <li className="list-group-item">teste</li>
                </ul>
                <table className="table">
                  <tbody>
                    {event.guests.map(r =>
                      <tr key={r.id} >
                        <td>{r.name}
                        </td>
                        {event.user.id === logged.id &&
                          <td className="cursor-pointer" onClick={() => handleExludeGuest(r.id)} title="Excluir Solicitante">
                            <i className="far fa-times-circle"></i>
                          </td>
                        }
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