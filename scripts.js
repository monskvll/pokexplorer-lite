$(document).ready(function () {
    const POKE_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

    $('#pokemonInput').change((event) => {
        let pokeValue = event.target.value.toLowerCase();

        if (!pokeValue) {
            return;
        }

        $('#container').html('<p>Looking for a ' + pokeValue + ' pokéball...</p>');

        fetch(POKE_ENDPOINT + pokeValue)
            .then(parseResponse)
            .then(parseData)
            .catch(handleErrors);
    });
});

const parseResponse = (response) => {
    if (!response.ok) {
        throw new Error('Pokémon not found!');
    }

    return response.json();
}

const parseData = (poke) => {
    console.log(poke); ///////////////////////////
    let pokeName = poke.name;
    let pokeNum = poke.id;

    let pokeType = poke.types[0].type.name;
    let pokeTypes = '';

    for (let i = 0; i < poke.types.length; i++) {
        pokeTypes += poke.types[i].type.name + ' ';
    }

    let pokeSprites = poke.sprites;
    let pokeMSpriteFront = pokeSprites.front_default;
    let pokeMSpriteBack = pokeSprites.back_default;

    $('#container').html(
        '<h2>' + pokeName + '</h2><br>' +
        '<img id="pokeMShownSprite" src="' + pokeMSpriteFront + '"><br>' +
        '<p>#' + pokeNum + '</p><br>' +
        '<p>' + pokeTypes + '</p>'
    );

    $('#container').ready(function () {
        let primaryTypeColor = '';

        switch (pokeType) {
            case 'normal':
                primaryTypeColor = '#a8a878';
                break;
            case 'fighting':
                primaryTypeColor = '#c03028';
                break;
            case 'flying':
                primaryTypeColor = '#a890f0';
                break;
            case 'poison':
                primaryTypeColor = '#a040a0';
                break;
            case 'ground':
                primaryTypeColor = '#e0c068';
                break;
            case 'rock':
                primaryTypeColor = '#b8a038';
                break;
            case 'bug':
                primaryTypeColor = '#a8b820';
                break;
            case 'ghost':
                primaryTypeColor = '#705898';
                break;
            case 'steel':
                primaryTypeColor = '#b8b8d0';
                break;
            case 'fire':
                primaryTypeColor = '#f08030';
                break;
            case 'water':
                primaryTypeColor = '#6890f0';
                break;
            case 'grass':
                primaryTypeColor = '#78c850';
                break;
            case 'electric':
                primaryTypeColor = '#f8d030';
                break;
            case 'psychic':
                primaryTypeColor = '#f85888';
                break;
            case 'ice':
                primaryTypeColor = '#98d8d8';
                break;
            case 'dragon':
                primaryTypeColor = '#7038f8';
                break;
            case 'dark':
                primaryTypeColor = '#705848';
                break;
            case 'fairy':
                primaryTypeColor = '#ff65d5';
                break;
            default:
                primaryTypeColor = '#f8f8f8'
                break;
        }

        $('body').attr('style', `background-color: ${primaryTypeColor}`);
    });

    $('#pokeMShownSprite').hover(() => {
        $('#pokeMShownSprite').attr('src', pokeMSpriteBack)
    }, () => {
        $('#pokeMShownSprite').attr('src', pokeMSpriteFront)
    });
}

const handleErrors = (error) => {
    $('#container').html('<p>' + error + '</p>');
}