const url = () => {
	const hostname = window.location.hostname 

	if(hostname === '10.20.0.26' || '10.20.0.22'){
		return 'comeve'
	}

	return

}
console.log('base url'+url())
export default url