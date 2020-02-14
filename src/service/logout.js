const logout = () => {
  localStorage.clear()
  window.location.reload()
}

export default logout