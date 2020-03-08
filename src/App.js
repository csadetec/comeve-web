import React, {useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {loadEvents, loadFollows, loadMoments, loadPlaces, loadResources, loadSectors, loadUsers} from './utils/load'

//components default
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//pages basic
import Home from './pages/Home'
import Login from './pages/Login'

//pages follows
import FollowList from './pages/FollowList'
import FollowForm from './pages/FollowForm'

//pages moments
import MomentList from './pages/MomentList'
import MomentForm from './pages/MomentForm'

//pages sectors
import SectorList from './pages/SectorList'
import SectorForm from './pages/SectorForm'

//pages events
import EventList from './pages/EventList'
import EventForm from './pages/EventForm'

//pages places
import PlaceList from './pages/PlaceList'
import PlaceForm from './pages/PlaceForm'

//pages resources
import ResourceList from './pages/ResourceList'
import ResourceForm from './pages/ResourceForm'



//componets users
import UserList from './pages/UserList'
import UserForm from './pages/UserForm'

const App = () => {
  //const [logged, setLogged] = useState(false)
  const token = localStorage.getItem('token')
  useEffect(() => {
  
    if (token) {
      loadFollows()
      loadSectors()
      loadMoments()
      loadResources()
      loadEvents()
      loadPlaces()
      loadUsers()
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

            <Route path='/seguimentos/listar' component={FollowList} />
            <Route path='/seguimentos/editar/:id' component={FollowForm} />
            <Route path='/seguimentos/cadastrar' component={FollowForm} />

            <Route path='/momentos/listar' component={MomentList} />
            <Route path='/momentos/editar/:id' component={MomentForm} />
            <Route path='/momentos/cadastrar' component={MomentForm} />                     

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

            <Redirect  to='/' />
           
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
