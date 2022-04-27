import {PokemonFromDB} from "../interfaces";

interface IFavorite {
  name: string;
  img: string;
}

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

const toggleFavorite = (name: string, img: string) => {
  let favorites: IFavorite[] = JSON.parse(
    localStorage.getItem("favorites") || "[]",
  );

  if (favorites.find((f) => f.name === name && f.img === img)) {
    favorites = favorites.filter((f) => !(f.name === name && f.img === img));
  } else {
    favorites.push({name, img});
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existInFavorites = (name: string, img: string): boolean => {
  if (typeof window === "undefined") return false;

  const favorites: IFavorite[] = JSON.parse(
    localStorage.getItem("favorites") || "[]",
  );

  return favorites.find((f) => f.name === name && f.img === img) !== undefined;
};

const pokemons = (): IFavorite[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

const exportedObject = {
  setPokemon,
  getPokemon,
  toggleFavorite,
  existInFavorites,
  pokemons,
};

export default exportedObject;
