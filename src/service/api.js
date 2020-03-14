import axios from 'axios'

const hostname = () => {
  const app = window.location.hostname 
  if(app === '10.20.0.22'){
    return 'http://10.20.2.22:8000'
  }
  if(app === 'localhost'){
    return 'http://localhost:8000' 
  }
  if(app === 'comeve-teste.netlify.com' || app === 'comeve.netlify.com'){
    return 'https://comeve-node.azurewebsites.net'
   
  }
  if(app === 'd-comeve.netlify.com'){
    return 'https://comeve.servico.site/api'
  }
  //https://comeve.netlify.com/
  return 'http://10.20.0.26:8001'
}

const api = axios.create({
  baseURL: hostname(),
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})
//console.log('23:38')
console.log(hostname())
export default api
