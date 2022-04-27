import type {NextPage} from "next";
import {useState} from "react";
import {PageLayout} from "../components/layout";
import {PokemonList} from "../components/pokemons";
import {SearchPokemon} from "../components/ui";

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState<string>("");

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <PageLayout title={"PokémonApp"}>
      <SearchPokemon handleKeyword={handleKeyword} />
      <PokemonList keyword={keyword} />
    </PageLayout>
  );
};

export default Home;
