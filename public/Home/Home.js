(async () => {
    const getEvents = async () => {
        const response = await fetch('/api/events')
        const events = await response.json()
        return events
    }

    const displayEvents = async () => {
        const events = await getEvents()
        const cardsContainer = document.getElementById('cards')

        events.forEach(event => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
                <div>
                    <h1>${event.name}</h1>
                    <p class="cardText">Location: ${event.location}</p>
                    <p class="cardText">Dates: ${event.dates}</p>
                    <p class="cardText">Hours: ${event.hours}</p>
                </div>
            `
            cardsContainer.appendChild(card)
        })
    }

    await displayEvents()

    const previousButton = document.querySelector('.previous')
    const nextButton = document.querySelector('.next')
    const cardsContainer = document.getElementById('cards')
    let currentIndex = 0

    previousButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--
            cardsContainer.style.transform = `translateX(-${currentIndex * 100}%)`
        }
    })

    nextButton.addEventListener('click', () => {
        const numCards = cardsContainer.querySelectorAll('.card').length
        if (currentIndex < numCards - 1) {
            currentIndex++
            cardsContainer.style.transform = `translateX(-${currentIndex * 100}%)`
        }
    })
})()