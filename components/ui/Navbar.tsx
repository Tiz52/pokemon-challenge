import Link from "next/link";
import {useRouter} from "next/router";

export const Navbar = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new");
  };

  return (
    <nav className="relative flex items-center justify-between">
      <Link href={"/"} passHref>
        <a className="text-xl font-semibold">Pokémon</a>
      </Link>
      <button
        className="inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500"
        onClick={onClick}
      >
        <span className="px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white">
          agregar
        </span>
      </button>
    </nav>
  );
};
