import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import './Navbar.css'

const Navbar = () => {
  const [home, setHome] = useState('nav-item active')

  const [seguimentos, setSeguimentos] = useState('nav-item')

  const [momentos, setMomentos] = useState('nav-item')
  const [setores, setSetores] = useState('nav-item')
  const [recursos, setRecursos] = useState('nav-item')
  const [eventos, setEventos] = useState('nav-item')
  const [locais, setLocais] = useState('nav-item')
  const [usuarios, setUsuarios] = useState('nav-item')
  const [logged] = useState(JSON.parse(localStorage.getItem('logged')))

  useEffect(() => {
    handleActive()
  }, [])


  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
    //console.log('baiii')
  }

  const handleActive = () => {
    setHome('nav-item')
    setSeguimentos('nav-item')
    setMomentos('nav-item')
    setRecursos('nav-item')
    setSetores('nav-item')
    setLocais('nav-item')

    setEventos('nav-item')

    setUsuarios('nav-item')

    let pathname = window.location.pathname
    /// console.log(pathname)
    if (pathname === '/seguimentos/listar') {
      return setSeguimentos('nav-item active')
    }
    if (pathname === '/momentos/listar') {
      return setMomentos('nav-item active')
    }
    if (pathname === '/setores/listar') {
      return setSetores('nav-item active')
    }
    if (pathname === '/recursos/listar') {
      return setRecursos('nav-item active')
    }

    if (pathname === '/eventos/listar') {
      return setEventos('nav-item active')
    }
    if (pathname === '/locais/listar') {
      return setLocais('nav-item active');
    }
    if (pathname === '/usuarios/listar') {
      return setUsuarios('nav-item active')
    }
    return setHome('nav-item active')
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark indigo mb-4 fixed-top">
        <a className="navbar-brand" href="/">Comeve</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav ml-auto mr-5 " onClick={handleActive}>
            <li className={home}>
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            <li className={locais}>
              <Link className="nav-link" to="/locais/listar">Locais</Link>
            </li>

            <li className={seguimentos}>
              <Link className="nav-link" to="/seguimentos/listar">Seguimentos</Link>
            </li>
            <li className={momentos}>
              <Link className="nav-link" to="/momentos/listar">Momentos</Link>
            </li>
            <li className={setores}>
              <Link className="nav-link" to="/setores/listar">Setores</Link>
            </li>
            <li className={recursos}>
              <Link className="nav-link" to="/recursos/listar">Recursos</Link>
            </li>
      
            <li className={eventos}>
              <Link className="nav-link" to="/eventos/listar">Eventos</Link>
            </li>


            <li className={usuarios}>
              <Link className="nav-link" to="/usuarios/listar">Usuários</Link>
            </li>

            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle cursor-pointer" id="navbarDropdownMenuLink" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" >{logged.name} | {logged.sector_name}</div>
              <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/eventos/listar">Eventos</Link>
                <Link className="dropdown-item" to="/usuarios/listar" onClick={handleActive}  >Usuários</Link>
                <Link className="dropdown-item" to="/teste" onClick={handleActive}  >Teste</Link>
                <a className="dropdown-item" href="/" onClick={handleLogout}>Sair</a>
              </div>
            </li>

          </ul>
        </div>
      </nav>
    </header>
  )

}

export default Navbar