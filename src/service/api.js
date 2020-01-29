import axios from 'axios'

const hostname = () => {
  const app = window.location.hostname 
  if(app === 'localhost'){
    return 'http://localhost:8001' 
  }
  if(app === 'comeve.netlify.com'){
    return 'https://comeve.azurewebsites.net'
  }

  return 'http://10.20.0.26:8001'
}

const api = axios.create({
  baseURL: hostname(),
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})
console.log(hostname())
export default api
