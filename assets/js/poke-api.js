const POKE_API = {};

function convertPokeApiToModel(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

POKE_API.getPokemonDetail = pokemon => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(convertPokeApiToModel);
};

POKE_API.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(jsonBody => jsonBody.map(POKE_API.getPokemonDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonDetails => pokemonDetails)
    .catch(error => console.error("Erro ao realizar a pesquisa", error));
};

const searchPokemon = pokemonName => {
  const searchURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  console.log(searchURL);

  fetch(searchURL)
    .then(response => response.json())
    .then(data => {
      const pokemon = convertPokeApiToModel(data);
      displayPokemonSearched(pokemon);
    })
    .catch(error => console.error("Erro ao realizar a pesquisa:", error));
};
