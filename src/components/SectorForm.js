import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../utils/logout'

import Loading from './default/Loading'
import Alert from './default/Alert'
import {loadSectors, loadUsers} from '../utils/load'


const ResourceForm = (props) => {

  const [name, setName] = useState('')
  const [alert, setAlert] = useState(false)
  const [h2, setH2] = useState('Cadastrar Setor')
  const [loading, setLoading] = useState(true)
  const { id } = props.match.params

  const history = useHistory()

  useEffect(() => {
    if (id === undefined) {
      document.title = 'Cadastrar Setor'
      setLoading(false)
      return;
    }
    setH2('Editar Setor')
    document.title = 'Editar Setor'
    //setLoading(true)
    async function loadSector() {
      const { data } = await api.get(`/sectors/${id}`)

      setName(data.name)
      setLoading(false)
    }
    loadSector()

  }, [id])

  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    let obj = { name }
    try {
      if (id) {
        const { status } = await api.put(`/sectors/${id}`, obj)

        if (status === 200) {
          setAlert('Atualizado com Sucesso')
          loadSectors()      
          loadUsers()   
         
          /** */
        }
        return;
      }

      //const { message } = await api.post('/sectors', obj)
      const { data } = await api.post('/sectors', obj)
      const { message } = data
      if (message) {
        setAlert(message)
        return;
      }
      await loadSectors()
      await loadUsers()
      history.push('/setores/listar')
      //window.location.reload()
      /** */
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

            <div className="card">

              <h5 className="card-header indigo white-text text-center py-4">
                <strong>Setor</strong>
              </h5>

              <div className="card-body px-lg-5">
                {alert &&
                  <Alert msg={alert} />
                }
                <form className="text-center mt-3" onSubmit={handleSubmit}>

                  <div className="md-form mt-3">
                    <input type="text" id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} autoFocus={true} required />
                    <label htmlFor="name" >Name</label>
                  </div>
                  <button className="btn btn-outline-indigo btn-rounded  z-depth-0 my-4 waves-effect" type="submit">Salvar</button>
                  <Link className="btn btn-outline-danger" to='/setores/listar'>Fechar</Link>

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

