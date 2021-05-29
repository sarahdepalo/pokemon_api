'use strict';

document.addEventListener('DOMContentLoaded', function() {
    
    function fetchPokemon() {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=151%27`).then(function(response) {
            return response.json();
        }).then(function(allPokemon) {
            allPokemon.results.forEach(function (pokemon) {
                fetchPokemonData(pokemon);
                
            })
        })
    }

    function fetchPokemonData(pokemon) {
        let url = pokemon.url;
        fetch(url).then(function(response) {
            return response.json();
        }).then(function(pokeData) {
            generatePokemon(pokeData);
            console.log(pokeData);
        })
    }

    function generatePokemon(pokeData) {

        //Gets Pokemon Name
        const pokeName = document.createElement('h3');
        pokeName.innerText = pokeData.name.toUpperCase();

        //Gets Sprite Image
        const spriteImage = document.createElement('img');
        const spriteImageSrc = pokeData.sprites.front_default;
        spriteImage.src = spriteImageSrc;

        //Gets Types
        const pokeTypes = document.createElement('ul');
        fetchTypes(pokeData.types, pokeTypes); //uses a function to append the type to an ul

        const pokeContainer = document.querySelector('#allPokeContainer');
        const individualContainers = document.createElement('div');
        individualContainers.classList.add('pokeContainers')

        individualContainers.append(pokeName, spriteImage, pokeTypes)
        pokeContainer.appendChild(individualContainers);
    }

    function fetchTypes(types, ul) {
        types.forEach(function(type) {
            let typeLiEl = document.createElement('li');
            typeLiEl.innerText = type['type']['name'];
            ul.append(typeLiEl);
        })
    }

    fetchPokemon();
})


