import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../service/logout'

import './style.css'
const UserForm = (props) => {

  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sector_id, setSectorId] = useState('')
  const [sectors, setSectors] = useState([])
  const [alert, setAlert] = useState(false)
  const [h2, setH2] = useState('')
  const { id } = props.match.params

  const history = useHistory()

  useEffect(() => {
    async function loadSectors() {
      const { data } = await api.get('sectors')

      setSectors(data)
      //console.log(data)
    }
    loadSectors()

    if (id === undefined) {
      document.title = 'Cadastrar Usuário'
      return;
    }
    setH2('Editar Usuário')
    document.title = 'Editar Usuário'


    async function loadUser() {
      const { data } = await api.get(`/users/${id}`)

      setName(data.name)
      setEmail(data.email)
      setSectorId(data.sector_id)
      /** */

    }
    loadUser()
    /** */
  }, [id])

  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    let obj = { email, password, name,  sector_id }
    /*
    console.log(obj)
    return ;
    /** */
    try {
      if (id) {
        const { status } = await api.put(`/users/${id}`, obj)

        //console.log(data)
        if (status === 200) {
          //console.log('update ')
          setAlert('Usuário Atualizado com Sucesso')
          return;
        }
      }

      const { data } = await api.post('/users', obj)
      const { message } = data

      if (message) {
        setAlert(message)
        return;
      }
      history.push('/usuarios/listar')

    } catch (e) {
      console.log(e)
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
        <div className="col-md-8">

          <div className="card">

            <h5 className="card-header indigo white-text text-center py-4">
              <strong>Informações do Usuário</strong>
            </h5>
            <div className="card-body px-lg-5">

              <form className="text-center" onSubmit={handleSubmit}>
                {alert &&
                  <div className="alert alert-info mt-2" role="alert">
                    {alert}
                  </div>
                }
                <div className="md-form mt-3">
                  <input type="email" id="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                  <label htmlFor="email" >Email</label>
                </div>

                <div className="md-form mt-3">
                  <input type="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                  <label htmlFor="password" >Senha</label>
                </div>
                <div className="md-form mt-3">
                  <input type="text" id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                  <label htmlFor="name" >Nome</label>
                </div>

                <div className="form-row">
                  <select value={sector_id} className="form-control" onChange={e => setSectorId(e.target.value)} required>
                    <option value="">Selecione o Setor</option>
                    {sectors.map(r =>
                      <option key={r.id} value={r.id}>{r.name}</option>
                    )}
                  </select>
                </div>

                <button className="btn btn-outline-indigo btn-rounded  z-depth-0 my-4 waves-effect" type="submit">Salvar</button>
                <Link className="btn btn-outline-danger" to='/usuarios/listar'>Fechar</Link>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default UserForm

