import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../utils/logout'
import {loadResources} from '../utils/load'

import Loading from './default/Loading'
import Alert from './default/Alert'

const ResourceForm = (props) => {

  const [resource, setResource] = useState({
    name:'',
    sector: ''
  })
  const [alert, setAlert] = useState(false)
  const [h2, setH2] = useState('Cadastrar Recurso')
  const [sectors] = useState(JSON.parse(localStorage.getItem('sectors')))
  const [btn, setBtn] = useState({
    label:'Salvar',
    disabled:false
  })
  const [loading, setLoading] = useState(true)
  const { id } = props.match.params

  const history = useHistory()

  useEffect(() => {
    if (id === undefined) {
      document.title = 'Cadastrar Recurso'
      setLoading(false)
      return;
    }
    setH2('Editar Recurso')
    document.title = 'Editar Recurso'
    async function load() {
      const { data } = await api.get(`/resources/${id}`)
      setResource(data)
      setLoading(false)
    }
    load()

  }, [id])

  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    setBtn({label:'Salvando...', disabled:true})
    try {
      if (id) {
        const { status } = await api.put(`/resources/${id}`, resource)

        if (status === 200) {
          setAlert('Atualizado com Sucesso')
          //localStorage.setItem()
          setBtn({label:'Salvar', disabled:false})

          loadResources()
          return;
        }
      }


      const { data } = await api.post('/resources', resource)
      const { message } = data

      if (message) {
        setAlert(message)
        setBtn({label:'Salvar', disabled:false})

        return;
      }
      await loadResources()

      history.push('/recursos/listar')
     
    } catch (e) {

      logout()
    }

    /** */
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
            <div className="card">

              <h5 className="card-header indigo white-text text-center py-4">
                <strong>Informações do Recurso</strong>
              </h5>
              <div className="card-body px-lg-5">

                <form className="text-center" onSubmit={handleSubmit}>

                  <div className="md-form mt-3">
                    <input type="text" id="name" className="form-control" value={resource.name} 
                    onChange={e => setResource({...resource, name: e.target.value}) } autoFocus={true} required />
                    <label htmlFor="name" >Name</label>
                  </div>
                  <div className="form-row">
                    <select value={resource.sector_id} className="form-control" onChange={e => setResource({...resource, sector_id: e.target.value})} required>
                      <option value="">Selecione o Setor</option>
                      {sectors.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}
                    </select>
                  </div>

                  <button className="btn btn-outline-indigo btn-rounded  z-depth-0 my-4 waves-effect" type="submit" disabled={btn.disabled}>{btn.label}</button>
                  <Link className="btn btn-outline-danger" to='/recursos/listar'>Fechar</Link>

                </form>
              </div>

            </div>
          </div>
        }
      </div>
    </div>

  )
}

export default ResourceForm

