import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import url from './service/url'

import Navbar from './components/default/Navbar'
import Footer from './components/default/Footer'

import Home from './components/default/Home'
import Login from './components/default/Login'

//componenct dos eventos
import EventList from './components/EventList'
import EventForm from './components/EventForm'

//components places
import PlaceList from './components/PlaceList'
import PlaceForm from './components/PlaceForm'

function App() {
  const [logged, setLogged ] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      setLogged(true)
    }
  }, [])

  return (
    <>
      {logged ?
      <Router>
        <Navbar />
        <Route exact={true} path='/' component={ EventList } />
        <Route path='/home' component={ Home } />
     
        <Route path='/locais/listar' component={PlaceList} />
        <Route path='/locais/cadastrar' component={PlaceForm} />
        <Route  path='/eventos/listar' component={ EventList } />
        <Route path='/eventos/cadastrar' component={ EventForm } />
        <Redirect from='*' to='/' />
        <Footer />
      </Router>
      :
      <Router>
        <Route exact={true} path='/' component={ Login } />
        <Redirect from='*' to='/' />        
      </Router>
      }
    </>
  )
}

export default App;
