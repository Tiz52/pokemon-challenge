import Image from "next/image";
import {useRouter} from "next/router";
import {FC} from "react";
import {SmallPokemon} from "../../interfaces";

interface Props {
  pokemon: SmallPokemon | null | undefined;
  fromApi: boolean;
}

export const PokemonCard: FC<Props> = ({pokemon, fromApi}) => {
  const router = useRouter();

  if (!pokemon) {
    if (fromApi) {
      return (
        <div className="flex justify-center">
          <span className="text-2xl italic font-bold text-yellow-500">
            Pokemon no encontrado en la PokeApi
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center">
          <span className="text-2xl italic font-bold text-yellow-500">
            Pokemon no encontrado en la base de datos
          </span>
        </div>
      );
    }
  }

  const {name, id, img} = pokemon;

  const onClick = () => {
    if (fromApi) return router.push(`/pokeapi/${pokemon.name}`);
    router.push(`/pokedex/${pokemon.name}`);
  };

  return (
    <div className="flex flex-col items-stretch justify-center gap-4 bg-[#111111] p-4 xl:p-10 rounded-2xl text-xs font-medium">
      <div className="flex justify-center">
        <Image
          src={img}
          width={256}
          height={256}
          objectFit="contain"
          alt={pokemon.name}
        />
      </div>
      <div className="flex justify-between">
        <span className="capitalize">{name}</span>
        <span>Pokedex: #{id}</span>
      </div>
      <div>
        <button
          className="inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500"
          onClick={onClick}
        >
          <span className="px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white">
            ver detalles
          </span>
        </button>
      </div>
    </div>
  );
};
