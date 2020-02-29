import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../utils/logout'
import {loadPlaces} from '../utils/load'

import Alert from './default/Alert'
import Loading from './default/Loading'

function PlaceForm(props) {

  const [place, setPlace] = useState({name:''})
  const [alert, setAlert] = useState(false)
  const [h2, setH2] = useState('Cadastrar Local')
  const [btn, setBtn] = useState({label:'Salvar', disabled: false})
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
      setPlace(data)
      setLoading(false)
      //console.log(data)
    }
    loadPlace()
    /** */
  }, [id])
  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    setBtn({label:'Salvando...', disabled:true})
    try {

      if (id) {
        const { status } = await api.put(`/places/${id}`, place)

        if (status === 200) {
          setAlert('Atualizado com Sucesso')
          setBtn({label:'Salvar', disabled:false})

          loadPlaces()
  
        }
        return;
      }

      const { data } = await api.post('/places', place)
      const { message } = data

      if (message) {
        setAlert(message)
        setBtn({label:'Salvar', disabled:false})

        return;
      }
      await loadPlaces()
      history.push('/locais/listar')
    
      //window.location.reload()
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
                value={place.name} onChange={e => setPlace({...place, name:e.target.value})}
                
                required
              />
              <div className="text-center">
                <button className="btn btn-outline-indigo" type="submit" disabled={btn.disabled}>{btn.label}</button>
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