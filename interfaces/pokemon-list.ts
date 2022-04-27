export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: SmallPokemon[];
}

export interface SmallPokemon {
  name: string;
  id: number;
  img: string;
}

export interface PokemonFromDB {
  name: string;
  img: string;
  abilities: string[];
  height: number;
  id: number;
  evolutions: string[];
  description: string;
  weight: number;
}
