import React, { useState } from 'react'
import api from '../../service/api'


function Login() {
  const [username, setUsername] = useState('detec')
  const [password, setPassword] = useState('teste')
  const [alert, setAlert] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await api.post('/authenticate', {
        username,
        password
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      window.location.reload()

      //console.log(response.data)
    } catch (e) {

      if (!e.response) {
        return setAlert('Erro no Servidor!')
      }

      let { field } = e.response.data[0]
   
      if (field === 'username') {
        setAlert('Usuário não cadastrado')
        return false;
      }

      setAlert('Senha Errada')

    }


  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          {alert &&
            <div className="alert alert-warning mt-2" role="alert">
              {alert}
            </div>
          }
          <form className="border border-light p-5" onSubmit={handleSubmit}>

            <input type="text" className="form-control mb-4" placeholder="Usuario"
              value={username} onChange={e => setUsername(e.target.value)}
              required
            />
            <input type="password" className="form-control mb-4" placeholder="Senha"
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