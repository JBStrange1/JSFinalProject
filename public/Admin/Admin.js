(async () =>{
    const eventsList = document.querySelector('.eventsList')



    const getEvents = async () => {
        const response = await fetch('/api/events')
		const events = await response.json()
		return events
    }
    
    const displayEvents = items => {
        document.querySelectorAll('.events').forEach(event => event.remove())

        const li = document.createElement('li')
        li.classList.add('events')
		eventsList.appendChild(li)
        const radio = document.createElement('input')
		radio.type = 'radio'
		radio.checked = true
        radio.name= 'eventId'
        radio.id = 'empty'
        radio.value = 'empty'
		radio.addEventListener('change', () => {
			document.querySelector('.eventName').value = ""
            document.querySelector('.eventDate').value = ""
            document.querySelector('.truckLocation').value = ""
            document.querySelector('.hours').value = ""
            document.querySelector('.imagepath').value = ""
            document.querySelector('#update_create').value = "Create"
            document.querySelector('#delete').hidden = true
		})
		li.appendChild(radio)

		items.forEach(({ _id, eventName, eventDate, truckLocation, hours, imagePath }) => {
			const li = document.createElement('li')
            li.classList.add('events')
			eventsList.appendChild(li)

			const label = document.createElement('label')
			label.textContent = eventName + ', '+ truckLocation +', ' + eventDate + ', ' + hours
            label.htmlFor= _id
            li.appendChild(label)

			const radio = document.createElement('input')
			radio.type = 'radio'
			radio.checked = false
            radio.name= 'eventId'
            radio.id = _id
            radio.value = _id
			radio.addEventListener('change', () => {
				document.querySelector('.eventName').value = eventName
                document.querySelector('.eventDate').value = eventDate
                document.querySelector('.truckLocation').value = truckLocation
                document.querySelector('.hours').value = hours
                document.querySelector('.imagepath').value = imagePath
                document.querySelector('#update_create').value = "Update"
                document.querySelector('#delete').hidden = false
			})
			li.appendChild(radio)
		})
	}


    displayEvents(await getEvents())

    let submitButton

    document.querySelector('#update_create').addEventListener('click',()=>{
        
        submitButton = document.querySelector('#update_create').value
    })

    document.querySelector('#delete').addEventListener('click',()=>{
        
        submitButton = document.querySelector('#delete').value
    })
    
    const form = document.querySelector("#eventsForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(form).entries());
        console.log(formData)
        console.log(submitButton)
        if(submitButton === 'Delete'){
            const response = await fetch('/api/events/'+formData.eventId,{
                method:'DELETE',
                headers : {'Content-Type': 'application/json'}
            })
        }else if(submitButton === 'Update'){
            const response = await fetch('/api/events/'+formData.eventId,{
                method:'PUT',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({'eventName': formData.eventName, 'eventDate':formData.eventDate, 'truckLocation':formData.truckLocation,'hours':formData.hours,'imagePath':formData.imagePath})
            })
        }else{
            const response = await fetch('/api/events',{
                method:'POST',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({'eventName': formData.eventName, 'eventDate':formData.eventDate, 'truckLocation':formData.truckLocation,'hours':formData.hours,'imagePath':formData.imagePath})
            })
        }
        displayEvents(await getEvents())
        document.querySelector('.eventName').value = ""
            document.querySelector('.eventDate').value = ""
            document.querySelector('.truckLocation').value = ""
            document.querySelector('.hours').value = ""
            document.querySelector('.imagepath').value = ""
            document.querySelector('#update_create').value = "Create"
            document.querySelector('#delete').hidden = true
    });

    const menuList = document.querySelector('.menuList')



    const getMenu = async () => {
        const response = await fetch('/api/menu')
		const menu = await response.json()
		return menu
    }
    
    const displayMenu = items => {
        document.querySelectorAll('.menu').forEach(menu => menu.remove())

        const li = document.createElement('li')
        li.classList.add('menu')
		menuList.appendChild(li)
        const radio = document.createElement('input')
		radio.type = 'radio'
		radio.checked = true
        radio.name= 'menuId'
        radio.id = 'empty'
        radio.value = 'empty'
		radio.addEventListener('change', () => {
			document.querySelector('.name').value = ""
            document.querySelector('.description').value = ""
            document.querySelector('.price').value = ""
            document.querySelector('.Mimagepath').value = ""
            document.querySelector('#Mupdate_create').value = "Create"
            document.querySelector('#Mdelete').hidden = true
		})
		li.appendChild(radio)

		items.forEach(({ _id, name, description, price, imagePath }) => {
			const li = document.createElement('li')
            li.classList.add('menu')
			menuList.appendChild(li)

			const label = document.createElement('label')
			label.textContent = name + ', '+ description +', ' + price 
            label.htmlFor= _id
            li.appendChild(label)

			const radio = document.createElement('input')
			radio.type = 'radio'
			radio.checked = false
            radio.name= 'menuId'
            radio.id = _id
            radio.value = _id
			radio.addEventListener('change', () => {
				document.querySelector('.name').value = name
                document.querySelector('.description').value = description
                document.querySelector('.price').value = price
                document.querySelector('.Mimagepath').value = imagePath
                document.querySelector('#Mupdate_create').value = "Update"
                document.querySelector('#Mdelete').hidden = false
			})
			li.appendChild(radio)
		})
	}


    displayMenu(await getMenu())

    let MsubmitButton

    document.querySelector('#Mupdate_create').addEventListener('click',()=>{
        
        MsubmitButton = document.querySelector('#Mupdate_create').value
    })

    document.querySelector('#Mdelete').addEventListener('click',()=>{
        
        MsubmitButton = document.querySelector('#Mdelete').value
    })
    
    const Mform = document.querySelector("#menuForm");

    Mform.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(Mform).entries());
        console.log(formData)
        console.log(MsubmitButton)
        if(MsubmitButton === 'Delete'){
            const response = await fetch('/api/menu/'+formData.menuId,{
                method:'DELETE',
                headers : {'Content-Type': 'application/json'}
            })
        }else if(MsubmitButton === 'Update'){
            const response = await fetch('/api/menu/'+formData.menuId,{
                method:'PUT',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({'name': formData.name, 'description':formData.description, 'price':formData.price,'imagePath':formData.MimagePath})
            })
        }else{
            const response = await fetch('/api/menu',{
                method:'POST',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({'name': formData.name, 'description':formData.description, 'price':formData.price,'imagePath':formData.MimagePath})
            })
        }
        displayMenu(await getMenu())
        document.querySelector('.name').value = ""
            document.querySelector('.description').value = ""
            document.querySelector('.price').value = ""
            document.querySelector('.Mimagepath').value = ""
            document.querySelector('#Mupdate_create').value = "Create"
            document.querySelector('#Mdelete').hidden = true
    });


})()