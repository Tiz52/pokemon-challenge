import {useEffect, useState} from "react";
import {SmallPokemon} from "../interfaces";
import {getPokemonDetails} from "../services/getPokemonDetails";

export const usePokemonFromApi = (keyword: string) => {
  const [pokemonFromApi, setPokemonFromApi] = useState<SmallPokemon | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPokemonDetails(keyword.toLocaleLowerCase())
      .then((p) => {
        setPokemonFromApi(p);
        setLoading(false);
      })
      .catch((error) => {
        setPokemonFromApi(null);
        setLoading(false);
      });
  }, [keyword]);

  return {pokemonFromApi, loading};
};
