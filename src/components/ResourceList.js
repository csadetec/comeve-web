import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
/*
import api from '../service/api'
import logout from '../utils/logout'
/** */
const  ResourceList = () => {

  const [resources ] = useState(JSON.parse(localStorage.getItem('resources')))
  let cont = 1
  useEffect(() => {
    document.title = 'Recursos'
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
                <th scope="col">Setor</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(r =>
                <tr key={r.id}>
                  <th scope="row">{cont++}</th>
                  <td>{r.name}</td>
                  <td>{r.sector.name}</td>
                  <td><Link to={`/recursos/editar/${r.id}`} title="Editar Recurso"><i className="fas fa-edit"></i></Link></td>
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