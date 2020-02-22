import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'

function PlaceList(props) {
  const [places, setPlaces] = useState(props.places)

 
  let cont = 1

  useEffect(() => {
    document.title = 'Locais'
    async function loadPlaces(){
      const { data } = await api.get('/places')
      setPlaces(data)
    }
    loadPlaces()
  }, [])


  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12 border-bottom">
          <Link type="button" className="btn btn-indigo float-right" to='/locais/cadastrar'>Cadastrar Local</Link>

          <h2>Locais</h2>
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
              {places.map(r =>
                <tr key={r.id}>
                  <th scope="row">{cont++}</th>
                  <td>{r.name}</td>
                  <td><Link to={`/locais/editar/${r.id}`}><i className="fas fa-edit"></i></Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PlaceList