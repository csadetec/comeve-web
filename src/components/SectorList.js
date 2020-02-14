import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'

const  SectorList = () => {
  const [sectors, setSectors ] = useState([])
  let cont = 1

  useEffect(() => {
    document.title = 'Setores'
    async function loadSectors(){
      const { data } = await api.get('/sectors')
      setSectors(data)
   
    }
    loadSectors()
  }, [])

/** */
  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12 border-bottom">
          <Link type="button" className="btn btn-indigo float-right" to='/setores/cadastrar'>Cadastrar Setor</Link>

          <h2>Setores</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {sectors.map(r =>
                <tr key={r.id}>
                  <th scope="row">{cont++}</th>
                  <td>{r.name}</td>
                  <td><Link to={`/setores/editar/${r.id}`} title="Editar Setor"><i className="fas fa-edit"></i></Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SectorList