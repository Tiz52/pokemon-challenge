import {PageLayout} from "../../components/layout";
import {PokemonForm} from "../../components/pokemons";

export const NewPokemonPage = () => {
  return (
    <PageLayout title={"New Pokémon"}>
      <PokemonForm />
    </PageLayout>
  );
};

export default NewPokemonPage;
