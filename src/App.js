import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//import url from './service/url'
import api from './service/api'

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

//componets users
import UserList from './components/UserList'
import UserForm from './components/UserForm'

import currentPage from './service/currentPage'


const App = () => {
  const [logged, setLogged] = useState(false)
  const [events, setEvents] = useState([])
  const [places, setPlaces] = useState([])
  const [resources, setResources] = useState([])
  const [sectors, setSectors] = useState([])
  const [users, setUsers] = useState([])
  //let location = useLocation()
  //console.log(currentPage())

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogged(true)
    }
    loadEventos()
    loadPlaces()
    loadResources()
    loadSectors()
    loadUsers()
  }, [])



  async function loadEventos() {
    const { data } = await api.get('/events')
    setEvents(data)
  }
  async function loadPlaces() {
    const { data } = await api.get('/places')
    setPlaces(data)
  }
  async function loadResources() {
    const { data } = await api.get('/resources')
    // return data
    setResources(data)
  }
  async function loadSectors() {
    const { data } = await api.get('/sectors')
    setSectors(data)
  }
  async function loadUsers() {
    const { data } = await api.get('/users')
    setUsers(data)
    //console.log(data)
  }

  return (
    <>
      {logged ?
        <Router >
          <Navbar />
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/home' component={Home} />

            <Route path='/locais/listar' >
              <PlaceList places={places} />
            </Route>
            <Route path='/locais/editar/:id' component={PlaceForm} />

            <Route path='/locais/cadastrar' component={PlaceForm} />


            <Route path='/eventos/listar'>
              <EventList events={events} />
            </Route>
            <Route path='/eventos/cadastrar' component={EventForm} />
            <Route path='/eventos/editar/:id' component={EventForm} />

            <Route path='/recursos/listar'>
              <ResourceList resources={resources} load={loadResources} />
            </Route>


            <Route path='/recursos/cadastrar' component={ResourceForm} />
            <Route path='/recursos/editar/:id' component={ResourceForm} />

            <Route path='/setores/listar'  >
              <SectorList sectors={sectors} />
            </Route>
            <Route path='/setores/cadastrar' component={SectorForm} />
            <Route path='/setores/editar/:id' component={SectorForm} />

            <Route path='/usuarios/listar'>
              <UserList users={users} />
            </Route>


            <Route path='/usuarios/cadastrar' component={UserForm} />
            <Route path='/usuarios/editar/:id' component={UserForm} />

           
          </Switch>

          <Footer />
        </Router>
        :
        <Router>
          <Route exact={true} path='/' component={Login} />
          <Redirect from='*' to='/' />
        </Router>
      }
    </>
  )
}

export default App;
