import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";

export const Navbar = () => {
  const router = useRouter();

  const onAddPokemon = () => {
    router.push("/new");
  };

  const onFavorites = () => {
    router.push("/favorites");
  };

  return (
    <nav className="relative flex items-center justify-between">
      <div className="flex items-center justify-center hover:text-white hover:scale-10">
        <Image src="/pokeball.png" alt="logo" width={36} height={24} />
        <Link href={"/"} passHref>
          <a className="text-sm font-semibold sm:text-2xl">Pokémon App</a>
        </Link>
      </div>
      <div className="flex gap-4">
        <button
          className="inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500"
          onClick={onFavorites}
        >
          <span className="sm:px-5 px-2  text-sm sm:text-base py-2  sm:py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white">
            Favoritos
          </span>
        </button>
        <button
          className="inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500"
          onClick={onAddPokemon}
        >
          <span className="sm:px-5 px-2  text-sm sm:text-base py-2  sm:py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white">
            Agregar
          </span>
        </button>
      </div>
    </nav>
  );
};
