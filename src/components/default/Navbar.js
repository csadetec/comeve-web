import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

function Navbar(){
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark indigo mb-4">
        <a className="navbar-brand" href="/comeve">Comeve - teste </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"  aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            <li className="nav-item ">
              <Link className="nav-link" to="/eventos/listar">Eventos</Link>
            </li>

            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle cursor-pointer" id="navbarDropdownMenuLink" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" >Nome do Usuário</div>
              <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/">Action</Link>
              </div>
            </li>

          </ul>
        </div>
      </nav>
    </header>
  )

}

export default Navbar