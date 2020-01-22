import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Navbar from './components/default/Navbar'
import Footer from './components/default/Footer'

import Home from './components/default/Home'
import Login from './components/default/Login'

//componenct dos eventos
import EventList from './components/EventList'
import EventForm from './components/EventForm'


function App() {
  const [logged, setLogged ] = useState(false)

  return (
    <>
      {logged ?
      <Router>
        <Navbar />
        <Route exact={true} path="/" component={ Home } />
        <Route path="/home" component={ Home } />

        <Route  path="/eventos/listar" component={ EventList } />
        <Route path="/eventos/cadastrar" component={ EventForm } />
        <Redirect from="*" to="/" />
        <Footer />
      </Router>
      :
      <Router>
        <Route exact={true} path="/" component={ Login } />
        <Redirect from='*' to='/' />        
      </Router>
      }
    </>
  )
}

export default App;
