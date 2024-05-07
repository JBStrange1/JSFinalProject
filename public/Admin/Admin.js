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
        radio.id = 'empty'
		radio.addEventListener('change', () => {
			document.querySelector('.eventName').value = ""
            document.querySelector('.eventDate').value = ""
            document.querySelector('.truckLocation').value = ""
            document.querySelector('.hours').value = ""

            document.querySelector('#update_create').value = "Create"
            document.querySelector('#delete').hidden = true
		})
		li.appendChild(radio)

		items.forEach(({ _id, eventName, eventDate, truckLocation, hours }) => {
			const li = document.createElement('li')
			eventsList.appendChild(li)

			const label = document.createElement('label')
			label.textContent = eventName + ', '+ truckLocation +', ' + eventDate + ', ' + hours
            label.htmlFor= _id
            li.appendChild(label)

			const radio = document.createElement('input')
			radio.type = 'radio'
			radio.checked = false
            radio.name= 'events'
            radio.id = _id
            radio.value = _id
			radio.addEventListener('change', () => {
				document.querySelector('.eventName').value = eventName
                document.querySelector('.eventDate').value = eventDate
                document.querySelector('.truckLocation').value = truckLocation
                document.querySelector('.hours').value = hours
                document.querySelector('#update_create').value = "Update"
                document.querySelector('#delete').hidden = false
			})
			li.appendChild(radio)
		})
	}


    displayEvents(await getEvents())
    document.querySelector('#update_create').addEventListener('submit',() =>{
        SubmitEvent.preventDefault()
        var form = document.getElementById("eventsForm");
        var formData = new FormData(form);
        for (var [key, value] of formData.entries()) {
            // Process each input name and value
            console.log(key + ": " + value);
        }
    })
    document.querySelector('#delete').addEventListener('submit',() =>{
        
    })
})()