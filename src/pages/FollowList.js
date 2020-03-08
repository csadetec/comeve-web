import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function FollowList() {
  const [follows] = useState(JSON.parse(localStorage.getItem('follows')))
  let cont = 1

  useEffect(() => {
    document.title = 'Momentos'
   
  }, [])

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12 border-bottom">
          <Link type="button" className="btn btn-indigo float-right" to='/seguimentos/cadastrar'>Cadastrar Seguimentos</Link>

          <h2>Seguimentos</h2>
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
            
              {follows.map(r =>
                <tr key={r.id} >
                  <th>{cont++}</th>
                  <td>{r.name}</td>
                  <td><Link to={`/seguimentos/editar/${r.id}`}><i className="fas fa-edit"></i></Link></td>

                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FollowList