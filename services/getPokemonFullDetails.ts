import {baseUrl} from "./settings";

export const getPokemonFullDetails = async (pokemonName: string) => {
  return fetch(`${baseUrl}/pokemon/${pokemonName}`).then((res) => res.json());
};
