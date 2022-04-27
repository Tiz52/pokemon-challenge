import {collection, DocumentData, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {SmallPokemon} from "../interfaces";

export const getPokemonFromDB = async (
  keyword: string,
): Promise<SmallPokemon | null> => {
  let pokemon: SmallPokemon | null | DocumentData | undefined = null;

  onSnapshot(query(collection(db, "pokemons")), (snapshot) => {
    const newPokemon = snapshot.docs
      .find(
        (doc) =>
          doc.data().name.toLocaleLowerCase() === keyword.toLocaleLowerCase(),
      )
      ?.data();
    if (newPokemon) {
      pokemon = newPokemon;
      console.log(pokemon);
    }
  });

  return pokemon;
};
