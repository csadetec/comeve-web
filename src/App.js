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
import FollowList from './pages/Follow/FollowList'
import FollowForm from './pages/Follow/FollowForm'

//pages moments
import MomentList from './pages/Moment/MomentList'
import MomentForm from './pages/Moment/MomentForm'

//pages sectors
import SectorList from './pages/Sector/SectorList'
import SectorForm from './pages/Sector/SectorForm'

//pages events
import EventList from './pages/Event/EventList'
import EventForm from './pages/Event/EventForm'

//pages places
import PlaceList from './pages/Place/PlaceList'
import PlaceForm from './pages/Place/PlaceForm'

//pages resources
import ResourceList from './pages/Resource/ResourceList'
import ResourceForm from './pages/Resource/ResourceForm'



//componets users
import UserList from './pages/User/UserList'
import UserForm from './pages/User/UserForm'


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
            {/*}
            <Route path='/teste' component={Teste} />
            */}
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
