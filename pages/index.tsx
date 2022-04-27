import type {NextPage} from "next";
import {useEffect, useState} from "react";
import {PageLayout} from "../components/layout";
import {PokemonList} from "../components/pokemons";
import {SearchPokemon} from "../components/ui";

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState<string>("");

  // useEffect(() => {
  //   localStorage.getItem("keyword") &&
  //     setKeyword(localStorage.getItem("keyword")!);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("keyword", keyword);
  // }, [keyword]);

  const handleKeyword = (keyword: string) => {
    // localStorage.setItem("keyword", keyword);
    setKeyword(keyword);
  };

  return (
    <PageLayout>
      <SearchPokemon handleKeyword={handleKeyword} />
      <PokemonList keyword={keyword} />
    </PageLayout>
  );
};

export default Home;
