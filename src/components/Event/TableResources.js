import React, { useState } from 'react'
import { useEffect } from 'react'

const TableResources = ({ myResources, resources, event, updateResource, disabled }) => {
  const [logged] = useState(JSON.parse(localStorage.getItem('logged')))
  const [filter, setFilter] = useState([])







  async function handleAddResource(e) {
    let resource_id = parseInt(e.target.value)
    let resourceSelected = resources.filter((r) => {
      return r.id === resource_id
    })
    let resourceVerifySelected = event.resources.filter((r) => {
      return r.id === resource_id
    })
    if (resourceVerifySelected.length === 0) {
      resourceSelected = resourceSelected[0];
      resourceSelected = { ...resourceSelected, accept: 0 };
      let myResources = ([...event.resources, resourceSelected])
      //await setEvent({ ...event, resources: myResources })
      updateResource(myResources)

    }
  }
  return (
    <h2>teste</h2>
  )
}

export default TableResources