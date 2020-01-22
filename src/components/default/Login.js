import React, { useState } from 'react'
import api from '../../service/api'


function Login() {
  const [username, setUsername] = useState('testet')
  const [password, setPassword] = useState('Sic7c8sic')

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const response = await api.post('/authenticate',{
        username,
        password
      })
  
      console.log(response.data)
    }catch(e){

      let { field } = e.response.data[0]

      if(field === 'username'){
        console.log('Usuario nao cadastrado')
      }
    }
    

  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <form className="border border-light p-5" onSubmit={handleSubmit}>
            <input type="text"  className="form-control mb-4" placeholder="Usuario"
              value={username} onChange={e => setUsername(e.target.value)}
              required
            />
            <input type="password"  className="form-control mb-4" placeholder="Senha"
              value={password} onChange={e => setPassword(e.target.value)}
              required
            />

            <button className="btn btn-outline-indigo btn-block" type="submit">ENTRAR</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login