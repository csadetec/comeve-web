import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'

const ResourceForm = () => {

  const [name, setName] = useState('')
  const [alert, setAlert] = useState(false)

  const history = useHistory()

  useEffect(() => {
    document.title = 'Cadastrar Recursos'
    /*
    async function loadEvents() {
      const response = await api.get('/events')
 
      setEvents(response.data)
      //console.log(response.data)
    }
 
    loadEvents()
    /** */
  }, [])
  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    //console.log('add recurso')

    try {
      const response = await api.post('/resources', {
        name
      })
      if (response.status === 200) {
        //console.log(response.data)
        history.push('/recursos/listar')

      }
    } catch (e) {

      if (!e.response) {
        return setAlert('Erro no Servidor!')
      }
      let { message } = e.response.data
      setAlert(message)
    }


  }

  return (
    <div className="container pb-5">
      <div className="row mb-4">
        <div className="col-md-12 border-bottom">
          <h2>Cadastrar Recursos</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {alert &&
            <div className="alert alert-warning mt-2" role="alert">
              {alert}
            </div>
          }
          <form className="border border-light p-4" onSubmit={handleSubmit}>
            {/*
            <p className="h4 mb-4 text-center">Dados do Evento</p>*/}
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" className="form-control mb-4" placeholder="Nome do local .."
              value={name} onChange={e => setName(e.target.value)}
              required
            />
            <div className="text-center">
              <button className="btn btn-outline-indigo" type="submit">Salvar</button>
              <Link className="btn btn-outline-danger" type="submit" to="/recursos/listar">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResourceForm