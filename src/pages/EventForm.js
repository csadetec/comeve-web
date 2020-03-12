import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import { loadEvents } from '../utils/load'

import Alert from '../components/Alert'
import Loading from '../components/Loading'
import dateFormat from '../utils/date'

//import TableResources from '../components/Event/TableResources'


import './Event.css'
import logout from '../utils/logout'

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
  const [table, setTable] = useState([])

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
        r.accept = r.pivot.accept,
      )
      data.resources.map(r =>
        r.date = r.pivot.date
      )
      console.log(data)
      if (logged.id !== data.user_id) {
        setDisable(true)
      }
      setEvent(data)
      setLoagind(false)
    }
    load()

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
      setFilter({ divulgacao, preproducao, ensaios, montagem, apresentacao })
    }
    loadFilters()


  }, [resources])


  async function handleSubmit(e) {
    e.preventDefault()

    console.log(event)
    setBtn({ label: 'Salvando...', disabled: true })
    //return;
    try {
      if (id) {
        const { status } = await api.put(`/events/${id}`, event)
        // console.log(data);

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
    } catch (e) {
      logout()
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
      //resourcesSe
      resourceSelected = { ...resourceSelected, accept: 0, date: event.date };
      let myResources = ([...event.resources, resourceSelected])
      await setEvent({ ...event, resources: myResources })

    }
  }
  async function updateResource(r) {
    await setEvent({ ...event, resources: r })

  }
  const handleExcludeResource = (id) => {
    console.log('exlude resource ', id)

    let resources = event.resources.filter(r => {
      return r.id !== id
    })
    updateResource(resources)

  }

  const handleAcceptDecline = (id, sector_name, accept) => {

    if (logged.sector_name !== sector_name) {
      window.alert(`Entre em contato com - ${sector_name}\nPara realizar está ação`)
      return;
    }
    let resources = event.resources.map(r => {
      if (r.id === id) {
        r.accept = accept === 1 ? 0 : 1
      }
      return r
    })
    updateResource(resources)
  }

  useEffect(() => {
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


      await setTable({ divulgacao, preproducao, ensaios, montagem, apresentacao })
    }
    loadTable()

  }, [event.resources])
  const updateField = (e) => {
    setAlert(false)
    setEvent({ ...event, [e.target.name]: e.target.value })
    //await loadTable()
  }
  return (
    <>

      {loading ?
        <Loading /> :
        <div className="container-fluid pb-5">
          <div className="row mb-4 border-bottom ">
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
                <input type="text" id="name" name="name" className="form-control mb-3" placeholder="Nome do eventos .."
                  value={event.name} onChange={updateField} disabled={disabled}
                  required
                />

                <div className="row">

                  <div className="col-md-4">
                    <label htmlFor="date">Data</label>
                    <input type="date" id="date" name="date" className="form-control mb-3"
                      value={event.date} onChange={updateField} disabled={disabled}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="start">Inicio</label>
                    <input type="time" id="start" name="start" className="form-control mb-3"
                      value={event.start} onChange={updateField} disabled={disabled}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="end">Fim</label>
                    <input type="time" id="end" name="end" className="form-control mb-3"
                      value={event.end} onChange={updateField} disabled={disabled}
                      required

                    />
                  </div>
                </div>
                <div className="row pb-2">
                  <div className="col-md-4">
                    <label htmlFor="place">Local</label>
                    <select value={event.place_id} name="place_id" onChange={updateField} className="form-control" disabled={disabled} required>
                      <option value="">Selecione</option>
                      {places.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="amount_people">Qtd Pessoas</label>
                    <input type="number" name="amount_people" className="form-control mb-3"
                      value={event.amount_people} onChange={updateField} disabled={disabled}
                      required
                    />

                  </div>
                  <div className="col-md-4">
                    <label htmlFor="date">Presença dos Pais</label>
                    <select name="parents" value={event.parents} onChange={updateField} className="form-control" required >
                      <option value="">Selecione</option>
                      <option value="0">Não</option>
                      <option value="1">Sim</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <select value="" className="form-control mb-3" onChange={handleAddGuest} disabled={disabled} >
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
              <div className="col-md-6 border-left ">

                { /*Divulgação */}
                <div className="row">
                  <div className="col-md-12">

                    <table className="table">
                      <tbody>
                        <tr>
                          <td colSpan={disabled ? 4 : 5} className="text-center">

                            <select value="" className="form-control" onChange={handleAddResource} disabled={disabled} >
                              <option value="">Divulgação</option>
                              {filter.divulgacao.map(r =>
                                <option key={r.id} value={r.id}>{r.name}</option>
                              )}
                            </select>
                          </td>

                        </tr>
                        {table.divulgacao.map(r =>
                          <tr key={r.id} >
                            {disabled ?
                              <td>{dateFormat(r.date)}</td>
                              :
                              <td>
                                <input type="date" value={r.date} className="form-control col-md-9" />
                              </td>
                            }
                            <td>{r.name}</td>
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
                        <tr>
                          <td colSpan={disabled ? 4 : 5} >
                            <select value="" className="form-control" onChange={handleAddResource} disabled={disabled} >
                              <option value="">Pré-Produção</option>
                              {filter.preproducao.map(r =>
                                <option key={r.id} value={r.id}>{r.name}</option>
                              )}
                            </select>
                          </td>
                        </tr>
                        {table.preproducao.map(r =>
                          <tr key={r.id} >
                            {disabled ?
                              <td>{dateFormat(r.date)}</td>
                              :
                              <td>
                                <input type="date" name="" id="" value={r.date} className="form-control col-md-9" />
                              </td>
                            }
                            <td>{r.name}</td>
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
                        <tr>
                          <td colSpan={disabled ? 4 : 5} >
                            <select value="" className="form-control" onChange={handleAddResource} disabled={disabled} >
                              <option value="">Ensaios</option>
                              {filter.ensaios.map(r =>
                                <option key={r.id} value={r.id}>{r.name}</option>
                              )}
                            </select>
                          </td>
                        </tr>
                        {table.ensaios.map(r =>
                          <tr key={r.id} >
                            <td>{dateFormat(r.date)}</td>
                            <td>{r.name}</td>
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
                        <tr>
                          <td colSpan={disabled ? 4 : 5} >
                            <select value="" className="form-control" onChange={handleAddResource} disabled={disabled} >
                              <option value="">Montagem</option>
                              {filter.montagem.map(r =>
                                <option key={r.id} value={r.id}>{r.name}</option>
                              )}
                            </select>
                          </td>
                        </tr>
                        {table.montagem.map(r =>
                          <tr key={r.id} >
                            <td>{dateFormat(r.date)}</td>
                            <td>{r.name}</td>
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
                        <tr>
                          <td colSpan={disabled ? 4 : 5} >
                            <select value="" className="form-control" onChange={handleAddResource} disabled={disabled} >
                              <option value="">Apresentação</option>
                              {filter.apresentacao.map(r =>
                                <option key={r.id} value={r.id}>{r.name}</option>
                              )}
                            </select>
                          </td>
                        </tr>
                        {table.apresentacao.map(r =>
                          <tr key={r.id} >
                            <td>{dateFormat(r.date)}</td>
                            <td>{r.name}</td>
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