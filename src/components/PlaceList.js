import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'

function PlaceList() {
  const [places, setPlaces ] = useState([])
  //const [cont, setCont ] = useState(0)
  let cont = 1

  useEffect(() => {
    async function loadPlaces(){
      const response = await api.get('/places')
      setPlaces(response.data)
   
      //console.log(response.data.length)
    }
    loadPlaces()
  }, [])


  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12 border-bottom">
          <Link type="button" className="btn btn-indigo float-right" to='/locais/cadastrar'>Cadastrar Locais</Link>

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
              </tr>
            </thead>
            <tbody>
              {places.map(r =>
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

export default PlaceList