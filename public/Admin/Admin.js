(async () =>{
    const eventsList = document.querySelector('.eventsList')
    const menuList = document.querySelector('.menuList')

    const getEvents = async () => {
        const response = await fetch('/api/events')
		const events = await response.json()
		return events
    }
    
    const displayEvents = items => {
        const li = document.createElement('li')
		eventsList.appendChild(li)
        const radio = document.createElement('input')
		radio.type = 'radio'
		radio.checked = true
        radio.name= 'events'
        radio.id = ''
		radio.addEventListener('change', () => {
			document.querySelector('.eventName').value = ""
            document.querySelector('.eventDate').value = ""
            document.querySelector('.truckLocation').value = ""
            document.querySelector('.hours').value = ""
		})
		li.appendChild(radio)

		items.forEach(({ _id, eventName, eventDate, truckLocation, hours }) => {
			const li = document.createElement('li')
			eventsList.appendChild(li)

			const span = document.createElement('span')
			span.textContent = eventName + ', '+ truckLocation +', ' + eventDate + ', ' + hours
			li.appendChild(span)

			const radio = document.createElement('input')
			radio.type = 'radio'
			radio.checked = false
            radio.name= 'events'
            radio.id = _id
			radio.addEventListener('change', () => {
				document.querySelector('.eventName').value = eventName
                document.querySelector('.eventDate').value = eventDate
                document.querySelector('.truckLocation').value = truckLocation
                document.querySelector('.hours').value = hours
			})
			li.appendChild(radio)
		})
	}


    displayEvents(await getEvents())
    document.querySelector('.update_create').addEventListener('submit',() =>{
        
    })
})()