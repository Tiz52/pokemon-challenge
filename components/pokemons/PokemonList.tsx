import {FC} from "react";

import {usePokemonFromApi, usePokemonFromDB} from "../../hooks";
import {Spinner} from "../ui";

import {PokemonCard} from "./PokemonCard";

interface Props {
  keyword: string;
}

export const PokemonList: FC<Props> = ({keyword}) => {
  const {pokemonFromApi, loading} = usePokemonFromApi(keyword);
  const pokemonFromDB = usePokemonFromDB(keyword); //Cambiado el pedido al localstorage por el hook

  return (
    <div className="flex flex-auto ">
      <div className="grid w-full grid-rows-2 gap-6 pt-12 md:grid-cols-2 md:grid-rows-1">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <span className="text-4xl italic font-bold text-yellow-500">
              PokeApi
            </span>
          </div>
          {keyword.length > 0 && (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <PokemonCard pokemon={pokemonFromApi} fromApi={true} />
              )}
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <span className="text-4xl italic font-bold text-yellow-500">
              PokeApi
            </span>
          </div>
          {keyword.length > 0 && (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <PokemonCard pokemon={pokemonFromDB} fromApi={false} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
