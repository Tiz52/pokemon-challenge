import Image from "next/image";
import {FC} from "react";
import {Pokemon} from "../../interfaces";

interface Props {
  pokemon: Pokemon;
}

export const PokemonDetails: FC<Props> = ({pokemon}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div
        className="flex w-full md:w-1/4
       justify-center items-center bg-[#111111] rounded px-12 py-8"
      >
        <div className="relative transition-all duration-1000 hover:-top-1">
          <Image
            src={
              pokemon.sprites.other?.dream_world?.front_default ||
              pokemon.sprites.front_default
            }
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
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>
        <p className="text-sm md:text-lg">
          <span className="font-bold">
            {pokemon.types.length > 1 ? "Tipos:" : "Tipo:"}
          </span>{" "}
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>
        <div className="mt-2">
          <p className="text-sm md:text-lg">
            <span className="font-bold">Shinys:</span>
          </p>
          {}
          <div className="flex gap-4 p-4">
            <Image
              src={pokemon.sprites.front_shiny}
              alt={pokemon.name}
              width={64}
              height={64}
            />
            <Image
              src={pokemon.sprites.back_shiny}
              alt={pokemon.name}
              width={64}
              height={64}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
