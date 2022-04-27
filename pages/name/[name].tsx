import {GetStaticProps, GetStaticPaths, NextPage} from "next";

import {PageLayout} from "../../components/layout";
import {PokemonDetails} from "../../components/pokemons";

import {baseUrl} from "../../services/settings";
import {PokemonListResponse} from "../../interfaces/pokemon-list";
import {getPokemonFullDetails} from "../../services/getPokemonFullDetails";
import {Pokemon} from "../../interfaces/pokemon-full";

interface Props {
  pokemon: Pokemon;
}

const PokemonByName: NextPage<Props> = ({pokemon}) => {
  return (
    <PageLayout>
      <PokemonDetails pokemon={pokemon} />
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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {name} = params as {name: string};

  const pokemon = await getPokemonFullDetails(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonByName;
