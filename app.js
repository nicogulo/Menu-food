const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('http://foodmenu-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <div class="character">
            <img src="${character.foto}"></img>
                <h2>${character.nama}</h2>
                <p> ${character.harga}</p>
                <p> ${character.detail}</p>
            </div>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();
