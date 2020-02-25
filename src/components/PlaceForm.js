import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../service/logout'

import Alert from './default/Alert'
import Loading from './default/Loading'

function PlaceForm(props) {

  const [name, setName] = useState('')
  const [alert, setAlert] = useState(false)
  const [h2, setH2] = useState('Cadastrar Local')
  const [btndisabled, setBtndisabled] = useState(false)
  const [btnLabel, setBtnLabel] = useState('Salvar')
  const [loading, setLoading ] = useState(true)
  const { id } = props.match.params
  const history = useHistory()

  useEffect(() => {

    if (id === undefined) {
      document.title = 'Cadastrar Local'
      setLoading(false)
      return;
      //setH2('Editar Local')
    }
    document.title = 'Cadastrar Local '
    setH2('Editar Local')
    async function loadPlace() {
      const { data } = await api.get(`/places/${id}`)
      setName(data.name)
      setLoading(false)
      //console.log(data)
    }
    loadPlace()
    /** */
  }, [id])
  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    let obj = { name }
    //console.log(obj)
    setBtnLabel('SALVANDO ...')
    setBtndisabled(true)
    try {

      if (id) {
        const { status, data } = await api.put(`/places/${id}`, obj)

        if (status === 200) {
          setAlert('Atualizado com Sucesso')
          console.log(data)
        }
        return;
      }

      const { data } = await api.post('/places', obj)
      const { message } = data

      if (message) {
        setAlert(message)
        setBtnLabel('Salvar')
        setBtndisabled(false)
        return;
      }

      history.push('/locais/listar')
    } catch (e) {
      logout()

    }


  }

  return (
    <div className="container pb-5">
      <div className="row mb-4">
        <div className="col-md-12 border-bottom">
          <h2>{h2}</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ?
          <Loading />
          :
          <div className="col-md-8">
            {alert &&
              <Alert msg={alert} />
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
                <button className="btn btn-outline-indigo" type="submit" disabled={btndisabled}>{btnLabel}</button>
                <Link className="btn btn-outline-danger" type="submit" to="/locais/listar">Fechar</Link>
              </div>
            </form>
          </div>
        }
      </div>
    </div>
  )
}

export default PlaceForm