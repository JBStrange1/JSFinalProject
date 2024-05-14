(async () => {
    const getMenu = async () => {
        const response = await fetch('/api/menu');
        const menu = await response.json();
        console.log(menu)
        return menu;
    };

    const displayMenu = async () => {
        const menu = await getMenu()
        const menuContainer = document.getElementById('menuContainer')

        menu.forEach(item => {
            
            const { name, description, price, imagePath } = item; 
            
            const menuItemDiv = document.createElement('div')
            menuItemDiv.classList.add('menuItem')

            const imageContainer = document.createElement('div')
            imageContainer.classList.add('imageContainer')

            const image = document.createElement('img')
            image.classList.add('menuImage')
            image.src = imagePath

            const itemDescriptionDiv = document.createElement('div')
            itemDescriptionDiv.classList.add('itemDescription')
    
            const itemName = document.createElement('p')
            itemName.classList.add('name')
            itemName.textContent = name
    
            const itemDescription = document.createElement('p')
            itemDescription.classList.add('description')
            itemDescription.textContent = description
    
            const itemPrice = document.createElement('p')
            itemPrice.classList.add('price')
            itemPrice.textContent = price
    
            imageContainer.appendChild(image);
            itemDescriptionDiv.appendChild(itemName);
            itemDescriptionDiv.appendChild(itemDescription);
            itemDescriptionDiv.appendChild(itemPrice);

            menuItemDiv.appendChild(imageContainer);
            menuItemDiv.appendChild(itemDescriptionDiv);
            menuContainer.appendChild(menuItemDiv);
        })
    }
    await displayMenu();
})();
