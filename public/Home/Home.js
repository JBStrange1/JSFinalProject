(async () => {
    const getEvents = async () => {
        const response = await fetch('/api/events');
        const events = await response.json();
        return events;
    };

    const displayEvents = async () => {
        const events = await getEvents();
        cards.forEach((card, index) => {
            const eventData = events[index]; 
            if (eventData) {
                createCard(card, eventData);
            }
        });
    };

    const createCard = (card, eventData) => {
        const { eventName, eventDate, truckLocation, Hours } = eventData;
        console.log(eventName)
        card.querySelector('.eventNameElement').textContent = eventName;
        card.querySelector('.eventDateElement').textContent = eventDate;
        card.querySelector('.truckLocationElement').textContent = truckLocation;
        card.querySelector('.HoursElement').textContent = Hours;
    };

    await displayEvents();
})();
