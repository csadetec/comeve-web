import React, { useState, useEffect } from 'react'
import api from '../../service/api'


function Login() {
  const [username, setUsername] = useState('detec123')
  const [password, setPassword] = useState('teste')
  const [alert, setAlert] = useState(false)
  const [btnLabel, setBtnLabel] = useState('ENTRAR')
  const [btnStatus, setBtnStatus] = useState(false)

  useEffect(() => {
    document.title = 'Comeve | Login'
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setBtnLabel('Carregando ...')
    setBtnStatus(true)
    try {

      const { data } = await api.post('/authenticate', {
        username,
        password
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      window.location.reload()
      //history.push('/home')

      //console.log(response.data)
    } catch (e) {
      setBtnLabel('ENTRAR')
      setBtnStatus(false)

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

            <button className="btn btn-outline-indigo btn-block" disabled={btnStatus} type="submit">{btnLabel}</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login
