import {useState, useEffect} from "react";
import {PageLayout} from "../../components/layout";
import {FavoritePokemons} from "../../components/pokemons";
import {pokemonStorage} from "../../utils";

interface IFavorite {
  name: string;
  img: string;
}

const Favorites = () => {
  const [favoritesPokemons, setFavoritesPokemons] = useState<IFavorite[]>([]);

  useEffect(() => {
    setFavoritesPokemons(pokemonStorage.pokemons());
  }, []);

  return (
    <PageLayout title="favorites">
      <FavoritePokemons pokemons={favoritesPokemons} />
    </PageLayout>
  );
};

export default Favorites;
