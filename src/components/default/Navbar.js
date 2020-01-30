import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = () =>{
  const [home,setHome] = useState('nav-item')
  const [eventos, setEventos] =useState('nav-item')
  const [locais, setLocais] = useState('nav-item')
  const [recursos, setRecursos] = useState('nav-item')

  const handleLogout = () =>{
    localStorage.clear()
    window.location.reload()
    //console.log('baiii')
  }

  const handleActive = () =>{
    setHome('nav-item')
    setEventos('nav-item')
    setLocais('nav-item')
    setRecursos('nav-item')

    let pathname = window.location.pathname
    if(pathname === '/eventos/listar'){
      return setEventos('nav-item active')

    }
    if(pathname === '/locais/listar'){
      return setLocais('nav-item active');
    }

    if(pathname === '/recursos/listar'){
      return setRecursos('nav-item active')
    }

    return setHome('nav-item active')
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark indigo mb-4">
        <a className="navbar-brand" href="/">Comeve</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"  aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav ml-auto mr-5 " onClick={handleActive}>
            <li className={home}>
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            <li className={eventos}>
              <Link className="nav-link" to="/eventos/listar">Eventos</Link>
            </li>
            <li className={locais}>
              <Link className="nav-link" to="/locais/listar">Locais</Link>
            </li>
            <li className={recursos}>
              <Link className="nav-link" to="/recursos/listar">Recursos</Link>
            </li>

            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle cursor-pointer" id="navbarDropdownMenuLink" data-toggle="dropdown"
aria-haspopup="true" aria-expanded="false" >{localStorage.getItem('username') }</div>
              <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/eventos/listar">Eventos</Link>
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