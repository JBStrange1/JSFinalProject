(async () => {
    const getEvents = async () => {
        const response = await fetch('/api/events')
        const events = await response.json()
        return events
    }

    const displayEvents = async () => {
        const events = await getEvents()
        const cardsContainer = document.getElementById('cards')
        const cards = cardsContainer.querySelectorAll('.card')
        const prevButton = document.getElementById('previousButton')
        const nextButton = document.querySelector('.next')
        let currentIndex = 0

        const updateDisplay = () => {
            cards.forEach((card, index) => {
                const eventData = events[(currentIndex + index) % events.length]
                updateCardWithFade(card, eventData)
            })
        }

        const updateCardWithFade = async (card, eventData) => {
            card.classList.remove('show') // Remove 'show' class to trigger fade-out effect
            await new Promise(resolve => setTimeout(resolve, 500)) // Wait for the fade-out effect to complete
            createCard(card, eventData)
            
            card.classList.add('show') // Add 'show' class to trigger fade-in effect
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + events.length) % events.length
            updateDisplay()
        })

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % events.length
            updateDisplay()
        })

        updateDisplay() // Initial display
    }

    const createCard = (card, eventData) => {
        const { eventName, eventDate, truckLocation, Hours } = eventData
        card.querySelector('.eventName').textContent = eventName
        card.querySelector('.eventDate').textContent = eventDate
        card.querySelector('.truckLocation').textContent = truckLocation
        card.querySelector('.Hours').textContent = Hours
        console.log(Hours)
    }

    await displayEvents()
})()
