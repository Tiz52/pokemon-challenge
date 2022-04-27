import Image from "next/image";
import {FC} from "react";
import {Pokemon, PokemonFromDB} from "../../interfaces";

interface Props {
  pokemon: PokemonFromDB;
}

export const PokemonDetailFromDB: FC<Props> = ({pokemon}) => {
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
      </div>
    </div>
  );
};
