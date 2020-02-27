//import { useLocation } from 'react-router-dom'

function currentPage(){
  //return useLocation()
  let pathname = window.location.pathname
  return pathname
  //return 'teste currentPage'
}
console.log(currentPage())
export default currentPage
