import {collection, onSnapshot, query} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../firebase";
import {PokemonFromDB} from "../interfaces";

export const usePokemonFromDB = (keyword: string) => {
  const [pokemonFromDB, setPokemonFromDB] = useState<PokemonFromDB | null>();

  useEffect(
    () =>
      onSnapshot(query(collection(db, "pokemons")), (snapshot) => {
        const pokemon = snapshot.docs
          .find(
            (doc) =>
              doc.data().name.toLocaleLowerCase() ===
              keyword.toLocaleLowerCase(),
          )
          ?.data();

        if (pokemon?.name) setPokemonFromDB(pokemon as PokemonFromDB);
        else setPokemonFromDB(null);
      }),
    [keyword],
  );

  return pokemonFromDB;
};
