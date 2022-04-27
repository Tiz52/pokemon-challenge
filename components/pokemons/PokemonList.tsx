import {collection, onSnapshot, query} from "firebase/firestore";
import Image from "next/image";
import {FC, useEffect, useState} from "react";
import {db} from "../../firebase";
import {SmallPokemon} from "../../interfaces";
import {getPokemonDetails} from "../../services/getPokemonDetails";
import {PokemonCard} from "./PokemonCard";

interface Props {
  keyword: string;
}

export const PokemonList: FC<Props> = ({keyword}) => {
  const [pokemonFromApi, setPokemonFromApi] = useState<SmallPokemon | null>(
    null,
  );
  const [pokemonFromStorage, setPokemonFromStorage] = useState<SmallPokemon>();

  useEffect(() => {
    if (keyword.length > 0) {
      console.log(keyword);
      getPokemonDetails(keyword.toLocaleLowerCase())
        .then(setPokemonFromApi)
        .catch((error) => {
          setPokemonFromApi(null);
        });
    }
  }, [keyword]);

  useEffect(() => {
    // const pokemons = JSON.parse(localStorage.getItem("pokemons") || "{}");
    // const newPokemon = pokemons.find(
    //   (pokemon) => pokemon.name === keyword.toLocaleLowerCase(),
    // );
    // setPokemonFromStorage(newPokemon);
  }, [keyword]);

  useEffect(
    () =>
      onSnapshot(query(collection(db, "pokemons")), (snapshot) => {
        const pokemon = snapshot.docs
          .find((doc) => doc.data().name === keyword)
          ?.data();
        setPokemonFromStorage(pokemon as SmallPokemon);
      }),
    [keyword],
  );

  return (
    <div className="grid grid-rows-2 gap-6 pt-12 md:grid-cols-2 md:grid-rows-1">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <span className="text-4xl italic font-bold text-yellow-500">
            PokeApi
          </span>
        </div>
        {keyword.length > 0 && (
          <PokemonCard pokemon={pokemonFromApi} fromApi={true} />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <span className="text-4xl italic font-bold text-yellow-500">
            My Pokedéx
          </span>
        </div>
        <div>
          {pokemonFromStorage && (
            <PokemonCard pokemon={pokemonFromStorage} fromApi={false} />
          )}
        </div>
      </div>
    </div>
  );
};
