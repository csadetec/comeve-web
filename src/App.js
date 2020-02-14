import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
//import url from './service/url'

//components default
import Navbar from './components/default/Navbar'
import Footer from './components/default/Footer'
import Home from './components/default/Home'
import Login from './components/default/Login'

//components events
import EventList from './components/EventList'
import EventForm from './components/EventForm'

//components places
import PlaceList from './components/PlaceList'
import PlaceForm from './components/PlaceForm'

//components resources
import ResourceList from './components/ResourceList'
import ResourceForm from './components/ResourceForm'

//components sectors
import SectorList from './components/SectorList'
import SectorForm from './components/SectorForm'

//components events with resources
//import EventResourceForm from './components/EventResourceForm'

const App = () => {
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
      <Router >
        <Navbar />
        <Route exact={true} path='/' component={ ResourceForm } />
        <Route path='/home' component={ Home } />
     
        <Route path='/locais/listar' component={PlaceList} />
        <Route path='/locais/cadastrar' component={PlaceForm} />
        <Route  path='/eventos/listar' component={ EventList } />
        <Route path='/eventos/cadastrar' component={ EventForm } />
        {/*<Route path='/eventos//recursos' component={ EventResourceForm } />*/}
        <Route path='/eventos/editar/:id' component={EventForm} />
        <Route path='/recursos/listar' component={ResourceList} />
        <Route path='/recursos/cadastrar' component={ResourceForm} />
        <Route path='/recursos/editar/:id' component={ResourceForm} />

        <Route path='/setores/listar' component={SectorList} />
        <Route path='/setores/cadastrar' component={SectorForm} />
        <Route path='/setores/editar/:id' component={SectorForm} />
        
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
