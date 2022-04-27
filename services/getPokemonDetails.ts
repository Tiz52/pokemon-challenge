import {Pokemon, SmallPokemon} from "../interfaces";
import {baseUrl} from "./settings";

export const getPokemonDetails = async (pokemonName: string) => {
  return fetch(`${baseUrl}/pokemon/${pokemonName}`)
    .then((res) => res.json())
    .then(fromApiResponseToPokemonSmall);
};

const fromApiResponseToPokemonSmall = (apiResponse: Pokemon): SmallPokemon => {
  const {name, id, sprites} = apiResponse;
  const img = sprites.other!.dream_world.front_default;
  return {name, id, img};
};
