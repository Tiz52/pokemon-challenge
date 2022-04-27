import {GetStaticProps, GetStaticPaths, NextPage} from "next";

import {PokemonDetailFromDB, PokemonDetails} from "../../components/pokemons";

import {baseUrl} from "../../services/settings";
import {
  PokemonFromDB,
  PokemonListResponse,
  SmallPokemon,
} from "../../interfaces/pokemon-list";
import {getPokemonFullDetails} from "../../services/getPokemonFullDetails";
import {Pokemon} from "../../interfaces/pokemon-full";
import {PageLayout} from "../../components/layout";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../firebase";

interface Props {
  name: string;
}

const PokemonByName: NextPage<Props> = ({name}) => {
  const [pokemonFromDB, setPokemonFromDB] = useState<PokemonFromDB>();

  useEffect(
    () =>
      onSnapshot(query(collection(db, "pokemons")), (snapshot) => {
        const pokemon = snapshot.docs
          .find((doc) => {
            return (
              doc.data().name.toLocaleLowerCase() === name.toLocaleLowerCase()
            );
          })
          ?.data();

        if (pokemon?.name) setPokemonFromDB(pokemon as PokemonFromDB);
      }),
    [name],
  );

  if (!pokemonFromDB) return <div>Loading...</div>;

  return (
    <PageLayout>
      <PokemonDetailFromDB pokemon={pokemonFromDB} />
    </PageLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const data: PokemonListResponse = await fetch(
    `${baseUrl}/pokemon?limit=151`,
  ).then((res) => res.json());

  const pokemon151: string[] = data.results.map((poke) => poke.name);

  return {
    paths: pokemon151.map((name) => ({
      params: {name},
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {name} = params as {name: string};

  return {
    props: {
      name,
    },
    revalidate: 86400,
  };
};

export default PokemonByName;
