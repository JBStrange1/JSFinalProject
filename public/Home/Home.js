(async () =>{
    const getEvents = async () => {
        const response = await fetch('/api/events')
		const events = await response.json()
		return events
    }

})()