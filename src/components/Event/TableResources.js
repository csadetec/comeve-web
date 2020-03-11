import React, {useState} from 'react'

const TableResources = ({ resources, event, updateResource }) => {
  const [logged] = useState(JSON.parse(localStorage.getItem('logged')))

  const handleExcludeResource = (id) => {
    console.log('exlude resource ', id)
    
    let resources = event.resources.filter(r => {
      return r.id !== id
    })
    updateResource(resources)

  }

  const handleAcceptDecline = (id, sector_name, accept) => {

    if (logged.sector_name !== sector_name) {
      window.alert(`Entre em contato com - ${sector_name}\nPara realizar está ação`)
      return;
    }
    let resources = event.resources.map(r => {
      if (r.id === id) {
        r.accept = accept === 1 ? 0 : 1
      }
      return r
    })
    updateResource(resources)
  }
  return (
    <>
      <table className="table">
        <tbody>
          {resources.map(r =>
            <tr key={r.id} >
              <td>{r.name}
              </td>
              <td>{r.sector_name}</td>
              {event.user.id === logged.id &&
                <td className="cursor-pointer" onClick={() => handleExcludeResource(r.id)} title="Excluir Recurso">
                  <i className="far fa-times-circle"></i>
                </td>
              }
              <td className="cursor-pointer"
                title={r.accept === 1 ? 'Negar Recurso' : 'Aceitar Recurso'}
                onClick={() => handleAcceptDecline(r.id, r.sector_name, r.accept)}>
                <i className={r.accept === 1 ? 'far fa-thumbs-up like' : 'far fa-thumbs-down deslike'}></i>
              </td>

            </tr>
          )}
        </tbody>

      </table>

    </>

  )

}
export default TableResources