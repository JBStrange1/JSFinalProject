(async () => {
    const getMenu = async () => {
        const response = await fetch('/api/menu');
        const menu = await response.json();
        console.log(menu)
        return menu;
    };


    await displayMenu();
})();