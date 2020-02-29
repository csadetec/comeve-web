import api from '../service/api'
import logout from '../utils/logout'
export async function loadEvents() {
  try{
    const { data } = await api.get('/events')
    localStorage.setItem('events', JSON.stringify(data))
    
  }catch(e){
    console.log(e)
    logout()
  }
  

}
export async function loadPlaces() {
  try{
    const { data } = await api.get('/places')
    localStorage.setItem('places', JSON.stringify(data))      
  }catch(e){
    //console.log(e)
    logout()
  }
  //setPlaces(data)
}
export async function loadResources() {
  try{
    const { data } = await api.get('/resources')
    localStorage.setItem('resources', JSON.stringify(data))  
  }catch(e){
    logout()
  }
}
export async function loadSectors() {
  try{
    const { data } = await api.get('/sectors')
    localStorage.setItem('sectors', JSON.stringify(data))
    //console.log(data)
  
  }catch(e){
    logout()
  }
}
export async function loadUsers() {
  try{
    const { data } = await api.get('/users')
    localStorage.setItem('users', JSON.stringify(data))
  
  }catch(e){
    logout()
  }
}

