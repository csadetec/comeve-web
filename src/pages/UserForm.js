import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../utils/logout'

import Alert from '../components/Alert'
import Loading from '../components/Loading'

import './style.css'
import { loadUsers, loadEvents } from '../utils/load'
const UserForm = (props) => {

  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    sector_id:''
  })

  const [sectors] = useState(JSON.parse(localStorage.getItem('sectors')))
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(true)
  const [h2, setH2] = useState('Cadastrar Usuário')

  const [btn, setBtn] = useState({label:'Salvar', disabled:false})
  const { id } = props.match.params

  const history = useHistory()

  useEffect(() => {
    if (id === undefined) {
      document.title = 'Cadastrar Usuário'
      setLoading(false)
      return;
    }
    setH2('Editar Usuário')
    document.title = 'Editar Usuário'


    async function load() {
      const { data } = await api.get(`/users/${id}`)
      data.password = ''
      setUser(data)
      setLoading(false)
    }
    load()
    /** */
  }, [id])

  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    setBtn({label: 'Salvando...', disabled:true})

    //console.log(user)
    //return

    try {
      if (id) {
        const { status } = await api.put(`/users/${id}`, user)

        //console.log(data)
        if (status === 200) {

          setAlert('Usuário Atualizado com Sucesso')
          setBtn({label: 'Salvar', disabled:false})
          loadUsers()
          loadEvents()
          return;
        }
      }

      const { data } = await api.post('/users', user)
      const { message } = data

      if (message) {
        setAlert(message)
        setBtn({label: 'Salvar', disabled:false})
        return;
      }
      await loadUsers()
      await loadEvents()
      history.push('/usuarios/listar')
     

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
                <strong>Informações do Usuário</strong>
              </h5>
              <div className="card-body px-lg-5">

                <form className="text-center" onSubmit={handleSubmit}>
                  {alert &&
                    <Alert msg={alert} />
                    
                  }
                  <div className="md-form mt-3">
                    <input type="email" id="email" className="form-control" value={user.email} 
                      onChange={e => setUser({...user, email:e.target.value})} required />
                    <label htmlFor="email" >Email</label>
                  </div>

                  <div className="md-form mt-3">
                    <input type="password" id="password" className="form-control" value={user.password} 
                      onChange={e => setUser({...user, password:e.target.value})} />
                    <label htmlFor="password" >Senha</label>
                  </div>
                  <div className="md-form mt-3">
                    <input type="text" id="name" className="form-control" value={user.name} 
                      onChange={e => setUser({...user, name:e.target.value})} required />
                    <label htmlFor="name" >Nome</label>
                  </div>

                  <div className="form-row">
                    <select value={user.sector_id} className="form-control" onChange={e => setUser({...user, sector_id:e.target.value})} required>
                      <option value="">Selecione o Setor</option>
                      {sectors.map(r =>
                        <option key={r.id} value={r.id}>{r.name}</option>
                      )}
                    </select>
                  </div>

                  <button className="btn btn-outline-indigo btn-rounded  z-depth-0 my-4 waves-effect" type="submit" disabled={btn.disabled}>{btn.label}</button>
                  <Link className="btn btn-outline-danger" to='/usuarios/listar'>Fechar</Link>

                </form>
              </div>

            </div>
          </div>
        }
      </div>
    </div>

  )
}

export default UserForm

