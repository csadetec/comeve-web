import React, {useEffect} from 'react'

function Home() {

  useEffect(() => {
    document.title = 'Home'
  })
  return(
    <div className="container">
      <h2>Home</h2>
      <p>Aplicação para organização dos recursos dos eventos do colégio</p>
      <p>teste 1159</p>
    </div>

  )
}

export default Home