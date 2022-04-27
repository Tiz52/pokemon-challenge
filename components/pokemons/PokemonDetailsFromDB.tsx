import Image from "next/image";
import {FC, useEffect, useState} from "react";
import {PokemonFromDB} from "../../interfaces";
import {pokemonStorage} from "../../utils";

import confetti from "canvas-confetti";

interface Props {
  pokemon: PokemonFromDB;
}

export const PokemonDetailFromDB: FC<Props> = ({pokemon}) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const img = pokemon.img;
    const name = pokemon.name;

    setIsInFavorites(pokemonStorage.existInFavorites(name, img));
  }, [pokemon]);

  const onToggleFavorites = () => {
    const img = pokemon.img;
    const name = pokemon.name;

    pokemonStorage.toggleFavorite(name, img);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div
        className="flex w-full md:w-1/4
       justify-center items-center bg-[#111111] rounded px-12 py-8"
      >
        <div className="relative transition-all duration-1000 hover:-top-1">
          <Image
            src={pokemon.img}
            alt={pokemon.name}
            width={320}
            height={320}
            objectFit="contain"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-auto p-4 bg-[#111111] rounded">
        <h1 className="text-2xl font-bold capitalize md:text-3xl">
          {pokemon.name}
        </h1>
        <p className="text-sm md:text-lg">
          <span className="font-bold">Número de Pokédex:</span> {pokemon.id}.
        </p>
        <p className="text-sm md:text-lg">
          <span className="font-bold">Altura:</span> {pokemon.height} ft.
        </p>
        <p className="text-sm md:text-lg">
          <span className="font-bold">Peso:</span> {pokemon.weight} lb.
        </p>
        <p className="text-sm md:text-lg">
          <span className="font-bold">
            {pokemon.abilities.length > 1 ? "Habilidades:" : "Habilidad:"}
          </span>{" "}
          {pokemon.abilities.map((ability) => ability).join(", ")}
        </p>
        <p className="text-sm md:text-lg">
          <span className="font-bold">
            {pokemon.evolutions.length > 1 ? "Evoluciones:" : "Evolución:"}
          </span>{" "}
          {pokemon.evolutions.map((evolution) => evolution).join(", ")}
        </p>
        <p className="text-sm md:text-lg">
          <span className="font-bold">Descripción:</span> {pokemon.description}.
        </p>
        <div className="flex justify-center my-4">
          <button
            className="inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500"
            onClick={onToggleFavorites}
          >
            <span className="px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white">
              {isInFavorites ? "Quitar de favoritos" : "Agregar a favoritos"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
