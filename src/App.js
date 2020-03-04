import React, {useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {loadEvents, loadPlaces, loadResources, loadSectors, loadUsers} from './utils/load'

//components default
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//pages basic
import Home from './pages/Home'
import Login from './pages/Login'

//pages events
import EventList from './pages/EventList'
import EventForm from './pages/EventForm'

//pages places
import PlaceList from './pages/PlaceList'
import PlaceForm from './pages/PlaceForm'

//pages resources
import ResourceList from './pages/ResourceList'
import ResourceForm from './pages/ResourceForm'

//pages sectors
import SectorList from './pages/SectorList'
import SectorForm from './pages/SectorForm'

//componets users
import UserList from './pages/UserList'
import UserForm from './pages/UserForm'

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
