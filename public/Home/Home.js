(async () => {
    const cards = document.querySelectorAll('.cards');

    const getEvents = async () => {
        const response = await fetch('/api/events');
        const events = await response.json();
        return events;
    };

    const displayEvents = async () => {
        const events = await getEvents();
        cards.forEach((card, index) => {
            const eventData = events[index]; // Assuming events are ordered and match the cards
            if (eventData) {
                createCard(card, eventData);
            }
        });
    };

    const createCard = (card, eventData) => {
        // Assuming card structure has elements like eventNameElement, eventDateElement, truckLocationElement, HoursElement
        const { eventName, eventDate, truckLocation, Hours } = eventData;
        card.querySelector('.eventNameElement').textContent = eventName;
        card.querySelector('.eventDateElement').textContent = eventDate;
        card.querySelector('.truckLocationElement').textContent = truckLocation;
        card.querySelector('.HoursElement').textContent = Hours;
    };

    await displayEvents();
})();
