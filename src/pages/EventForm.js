import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import { loadEvents } from '../utils/load'

import Alert from '../components/Alert'
import Loading from '../components/Loading'
import TableResources from '../components/Event/TableResources'


import './Event.css'

function EventForm(props) {

  const [event, setEvent] = useState({
    name: '',
    place_id: '',
    date: '',
    start: '',
    end: '',
    user: '',
    parentes: '',
    guest: [],
    resources: []
  })

  const [filter, setFilter] = useState({
    'divulgacao': '',
    'preproducao': '',
    'ensaios': '',
    'montagem': '',
    'apresentacao': ''
  })
  const [table, setTable] = useState({
    'divulgacao': '',
    'preproducao': '',
    'ensaios': '',
    'montagem': '',
    'apresentacao': ''
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
      //data.guests = []
      if (logged.id !== data.user_id) {
        setDisable(true)
      }
      setEvent(data)
      setLoagind(false)
      console.log(data)

    }
    load()
    loadTable()
  }, [id, logged.id])

  useEffect(() => {
    async function loadFilters() {
      let divulgacao = resources.filter(r => {
        return r.moment_id === 1
      })
      let preproducao = resources.filter(r => {
        return r.moment_id === 2
      })
      let ensaios = resources.filter(r => {
        return r.moment_id === 3
      })
      let montagem = resources.filter(r => {
        return r.moment_id === 4
      })
      let apresentacao = resources.filter(r => {
        return r.moment_id === 5
      })
      setFilter({ divulgacao, apresentacao, preproducao, ensaios, montagem, apresentacao })
      //await console.log(filter)
    }
    loadFilters()

  }, [])

  async function loadTable() {
    let divulgacao = event.resources.filter((r) => {
      return r.moment_id === 1
    })
    let preproducao = event.resources.filter((r) => {
      return r.moment_id === 2
    })
    let ensaios = event.resources.filter((r) => {
      return r.moment_id === 3
    })
    let montagem = event.resources.filter((r) => {
      return r.moment_id === 4
    })
    let apresentacao = event.resources.filter((r) => {
      return r.moment_id === 5
    })

    setTable({ divulgacao, preproducao, ensaios, montagem, apresentacao })
  }

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
    let guest_id = parseInt(e.target.value)
    let guestSelected = resources.filter((r) => {
      return r.id === guest_id
    })

    let guestVerifySelected = event.guests.filter((r) => {
      return r.id === guest_id
    })

    if (guestVerifySelected.length === 0) {
      guestSelected = guestSelected[0]
      console.log(guestSelected)
      console.log(guestVerifySelected)

    }
    //console.log(guest_id)

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
      resourceSelected = { ...resourceSelected, accept: 0 };
      let myResources = ([...event.resources, resourceSelected])
      await setEvent({ ...event, resources: myResources })

    }
  }
  async function updateResource(r) {
    await setEvent({ ...event, resources: r })
    //console.log('update resource')
    //console.log(r)
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
              {event.user.name && `Criador: ${event.user.name}`}
              <br />
              {event.created_at && `Data: ${event.created_at}`}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {alert &&
              <Alert msg={alert} />
            }
            <div className="row border border-light p-3">
              <div className="col-md-6">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" className="form-control mb-4" placeholder="Nome do eventos .."
                  value={event.name} onChange={updateField} disabled={disabled}
                  required
                />
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
                    <label htmlFor="amount_people">Qtd Pessoas</label>
                    <input type="number" name="amount_people" className="form-control mb-4"
                      value={event.amount_people} onChange={updateField} disabled={disabled}
                      required
                    />

                  </div>

                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="date">Presença dos Pais</label>
                    <select name="parents" value={event.parents} onChange={updateField} className="form-control" required >
                      <option value="">Selecione</option>
                      <option value="0">Não</option>
                      <option value="1">Sim</option>
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
                    <select value="" className="form-control mb-4" onChange={handleAddGuest} disabled={disabled} >
                      <option value="">SELECIONE O CONVIDADO</option>
                      {guest.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}

                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-outline-indigo" type="submit" disabled={btn.disabled}>{btn.label}</button>
                    <Link className="btn btn-outline-danger" type="submit" to="/eventos/listar">Fechar</Link>
                  </div>
                </div>


              </div>
              <div className="col-md-4 border-left ">
                <div className="row pt-4" >
             
                  <div className="col-md-12">
                    <select value="" className="form-control mb-4" onChange={handleAddResource} disabled={disabled} >
                      <option value="">Divulgação</option>
                      {filter.divulgacao.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}

                    </select>
                  </div>
                </div>
                <TableResources
                  resources={event.resources}
                  event={event}
                  update={updateResource}
                  updateResource={updateResource} />

                <div className="row  pt-4">
                  <div className="col-md-12">
                    <select value="" className="form-control mb-4" onChange={handleAddResource} disabled={disabled} >
                      <option value="">Pré-Produção</option>
                      {filter.preproducao.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}

                    </select>
                  </div>
                </div>
                <TableResources
                  resources={event.resources}
                  event={event}
                  update={updateResource}
                  updateResource={updateResource} />

                <div className="row">
                  <div className="col-md-12">
                    <select value="" className="form-control mb-4" onChange={handleAddResource} disabled={disabled} >
                      <option value="">Ensaios</option>
                      {filter.ensaios.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}

                    </select>
                  </div>
                </div>
                <TableResources
                  resources={event.resources}
                  event={event}
                  update={updateResource}
                  updateResource={updateResource} />
                <div className="row">
                  <div className="col-md-12">
                    <select value="" className="form-control mb-4" onChange={handleAddResource} disabled={disabled} >
                      <option value="">Montagem</option>
                      {filter.montagem.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}

                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <select value="" className="form-control mb-4" onChange={handleAddResource} disabled={disabled} >
                      <option value="">Apresentação</option>
                      {filter.apresentacao.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}

                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-2 text-right">
                <ul className="list-group">
                  {event.guests.map(r =>
                    <li className="list-group-item" key={r.id}>
                      {r.name}
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </form>

        </div>
      }
    </>
  )
}

export default EventForm