import {SearchIcon} from "@heroicons/react/outline";
import {FC, useState} from "react";

interface Props {
  handleKeyword: (keyword: string) => void;
}

export const SearchPokemon: FC<Props> = ({handleKeyword}) => {
  const [pokemon, setPokemon] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pokemon.length === 0) {
      return;
    }

    handleKeyword(pokemon);
    setPokemon("");
  };

  return (
    <div className="flex items-start justify-center w-full py-5 ">
      <form
        className="relative flex justify-center w-72 "
        onSubmit={handleSubmit}
      >
        <input
          className="w-full px-4 py-2 rounded-lg bg-[#111111] focus:outline-none focus:shadow-outline"
          placeholder="Escriba el nombre del Pókemon"
          name="pokemon"
          value={pokemon}
          autoComplete="off"
          onChange={(e) => setPokemon(e.target.value)}
        />
        <button className="hover:text-white hover:scale-105">
          <SearchIcon className="absolute w-5 h-5 right-1 top-2" />
        </button>
      </form>
    </div>
  );
};
