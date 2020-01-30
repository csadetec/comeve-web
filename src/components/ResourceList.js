import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'

const  ResourceList = () => {
  const [resources, setResources ] = useState([])
  let cont = 1

  useEffect(() => {
    document.title = 'Recursos'
    async function loadResources(){
      const response = await api.get('/resources')
      setResources(response.data)
   
      console.log(response.data)
    }
    loadResources()
  }, [])

/** */
  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12 border-bottom">
          <Link type="button" className="btn btn-indigo float-right" to='/recursos/cadastrar'>Cadastrar Recursos</Link>

          <h2>Recursos</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(r =>
                <tr key={r.id}>
                  <th scope="row">{cont++}</th>
                  <td>{r.name}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ResourceList