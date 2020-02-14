import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'

const ResourceForm = (props) => {

  const [name, setName] = useState('')
  const [sector, setSector] = useState('')
  const [alert, setAlert] = useState(false)
  const [h2, setH2 ] = useState('Cadastrar Recurso')

  const history = useHistory()

  useEffect(() => {
    const { id } = props.match.params
    if(id === undefined){
      document.title = 'Cadastrar Recurso'
      return;
    }
    setH2('Editar Recurso')
    document.title = 'Editar Recurso'
    async function loadResource(){
      const { data } = await api.get(`/resources/${id}`)
      setName(data.name)
      console.log(data)
    }
    loadResource()
    console.log(id)
  }, [props.match.params])

  /** */
  async function handleSubmit(e) {
    e.preventDefault()
    //console.log('add recurso')
    let obj = {name, sector}
    //console.log(obj)
    

    try {
      const response = await api.post('/resources', obj)
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
            <div className="alert alert-warning mt-2" role="alert">
              {alert}
            </div>
          }
          <div className="card">

            <h5 className="card-header indigo white-text text-center py-4">
              <strong>Informações do Recurso</strong>
            </h5>
            <div className="card-body px-lg-5">

              <form className="text-center" onSubmit={handleSubmit}>
     
                <div className="md-form mt-3">
                  <input type="text" id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} autoFocus={true} required />
                  <label htmlFor="name" >Name</label>
                </div>
                <div className="form-row">
                  <select value={sector} className="form-control" onChange={e => setSector(e.target.value)} required>
                    <option value="">Selecione o Setor</option>
                    <option value="Comunicação">Comunicação</option>
                    <option value="Detec">Detec</option>
                    <option value="Serviços Gerais">Serviços Gerais</option>
                  </select>
                </div>

                <button className="btn btn-outline-indigo btn-rounded  z-depth-0 my-4 waves-effect" type="submit">Salvar</button>
                <Link className="btn btn-outline-danger" to='/recursos/listar'>Fechar</Link>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ResourceForm

