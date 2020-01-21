import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Navbar from './components/default/Navbar'
import Footer from './components/default/Footer'

import Home from './components/default/Home'

//componenct dos eventos
import EventList from './components/EventList'
import EventForm from './components/EventForm'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route exact={true} path="/" component={ EventForm } />
        <Route path="/home" component={ Home } />

        <Route  path="/eventos/listar" component={ EventList } />
        <Route path="/eventos/cadastrar" component={ EventForm } />
        <Redirect from="*" to="/" />
        <Footer />
      </Router>
    </>
  )
}

export default App;
