import {FC} from "react";
import {FavoritePokemon} from "./FavoritePokemon";

interface Props {
  pokemons: {
    name: string;
    img: string;
  }[];
}

export const FavoritePokemons: FC<Props> = ({pokemons}) => {
  return (
    <div className="grid gap-4 p-6 md:grid-cols-4 xl:grid-cols-6">
      {pokemons.map((pokemon) => (
        <FavoritePokemon key={pokemon.img} pokemon={pokemon} />
      ))}
    </div>
  );
};
