const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMore");

let offset = 0;
const limit = 20;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  POKE_API.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons
      .map(
        pokemon =>
          `
      <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.id}</span>
      <span class="name">${pokemon.name}</span>
      
      <div class="detail">
      <ol class="types">
      ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join("")}
      </ol>
      
      <img
      src="${pokemon.photo}"
      alt="${pokemon.name}"
      />
      </div>
      </li>
      `
      )
      .join("");
  });
}

function displayPokemonSearched(pokemon) {
  pokemonList.innerHTML = `
      <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.id}</span>
      <span class="name">${pokemon.name}</span>
      
      <div class="detail">
      <ol class="types">
      ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join("")}
      </ol>
      
      <img
      src="${pokemon.photo}"
      alt="${pokemon.name}"
      />
      </div>
      </li>
  `;
}

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const inputSearchField = document.getElementById("inputSearchField").value.trim().toLowerCase();

  if (inputSearchField === "") {
    alert("Digite o nome de um Pokemon para pesquisar");
    return;
  }

  const pokemonSearched = searchPokemon(inputSearchField);

  displayPokemonSearched(pokemonSearched);

  loadMoreButton.parentElement.removeChild(loadMoreButton);

  console.log(pokemonSearched);
});

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const totalRecords = offset + limit;

  if (totalRecords >= maxRecords) {
    const newLimit = maxRecords - offset;

    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
