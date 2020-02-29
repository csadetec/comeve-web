import React, {useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {loadEvents, loadPlaces, loadResources, loadSectors, loadUsers} from './utils/load'

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

const App = () => {
  //const [logged, setLogged] = useState(false)
  const token = localStorage.getItem('token')
  useEffect(() => {
  
    if (token) {
      loadEvents()
      loadPlaces()
      loadResources()
      loadUsers()
      loadSectors()
    }
  }, [token])

  return (
    <>
      {token ?
        <Router >
          <Navbar />
          <Switch>
          
            <Route exact={true} path='/' component={Home} />
            <Route path='/home' component={Home} />

            <Route path='/locais/listar' component={PlaceList} />
            <Route path='/locais/editar/:id' component={PlaceForm} />
            <Route path='/locais/cadastrar' component={PlaceForm} />

            <Route path='/eventos/listar' component={EventList} />
            <Route path='/eventos/cadastrar' component={EventForm} />
            <Route path='/eventos/editar/:id' component={EventForm} />

            <Route path='/recursos/listar' component={ResourceList} />
            <Route path='/recursos/cadastrar' component={ResourceForm} />
            <Route path='/recursos/editar/:id' component={ResourceForm} />

            <Route path='/setores/listar'  component={SectorList} />
            <Route path='/setores/cadastrar' component={SectorForm} />
            <Route path='/setores/editar/:id' component={SectorForm} />

            <Route path='/usuarios/listar' component={UserList} />
            <Route path='/usuarios/cadastrar' component={UserForm} />
            <Route path='/usuarios/editar/:id' component={UserForm} />
           
          </Switch>

          <Footer />
        </Router>
        :
        <Router>
          <Route exact={true} path='/' component={Login} />
          <Redirect path='*' to='/' />
         
        </Router>
      }
    </>
  )
}

export default App;
