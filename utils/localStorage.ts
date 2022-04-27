import {PokemonFromDB} from "../interfaces";

const setPokemon = (pokemon: PokemonFromDB) => {
  let pokemons: PokemonFromDB[] = JSON.parse(
    localStorage.getItem("pokemons") || "[]",
  );

  pokemons.push(pokemon);

  localStorage.setItem("pokemons", JSON.stringify(pokemons));
};

const getPokemon = (keyword: string): PokemonFromDB | null => {
  let pokemons = JSON.parse(
    localStorage.getItem("pokemons") || "[]",
  ) as PokemonFromDB[];

  const newPokemon = pokemons.find((pokemon) => {
    if (pokemon.name.toLocaleLowerCase() === keyword.toLocaleLowerCase()) {
      return pokemon;
    }
  });

  return newPokemon ? newPokemon : null;
};

const exportedObject = {
  setPokemon,
  getPokemon,
};

export default exportedObject;
