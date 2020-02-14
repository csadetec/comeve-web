import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'

const ResourceForm = (props) => {

  const [name, setName] = useState('')
  const [sector, setSector] = useState('')
  const [alert, setAlert] = useState(false)
  const [h2, setH2 ] = useState('Cadastrar Setor')
  const { id } = props.match.params

  const history = useHistory()

  useEffect(() => {
    if(id === undefined){
      document.title = 'Cadastrar Setor'
      return;
    }
    setH2('Editar Setor')
    document.title = 'Editar Setor'
    async function loadResource(){
      const { data } = await api.get(`/sectors/${id}`)

      setName(data.name)
      setSector(data.sector)
      console.log(data)
    }
    loadResource()
  
  }, [id])

  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    let obj = {name, sector}
    try {
      if(id){
        const { status } = await api.put(`/sectors/${id}`, obj)

        if(status === 200){
          //onsole.log('update ')
          setAlert('Atualizado com Sucesso')
        }
        return ;
      }

      //const { message } = await api.post('/sectors', obj)
      const { data } = await api.post('/sectors', obj)
      const { message } = data 
      if (message) {
        setAlert(message)
        return ;
      }
     history.push('/setores/listar')
     /** */
    } catch (e) {

      localStorage.clear()
      window.location.reload()
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
          {alert &&
            <div className="alert alert-info mt-2" role="alert">
              {alert}
            </div>
          }
          <div className="card">

            <h5 className="card-header indigo white-text text-center py-4">
              <strong>Setor</strong>
            </h5>
            <div className="card-body px-lg-5">

              <form className="text-center" onSubmit={handleSubmit}>
     
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
      </div>
    </div>
    
  )
}

export default ResourceForm

