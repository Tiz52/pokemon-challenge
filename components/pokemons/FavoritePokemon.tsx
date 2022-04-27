import Image from "next/image";
import {useRouter} from "next/router";
import {FC} from "react";

interface Props {
  pokemon: {
    name: string;
    img: string;
  };
}

export const FavoritePokemon: FC<Props> = ({pokemon}) => {
  const router = useRouter();

  const {name, img} = pokemon;

  const onClick = () => {
    if (img.includes("raw")) return router.push(`/pokeapi/${pokemon.name}`);
    router.push(`/pokedex/${pokemon.name}`);
  };

  return (
    <div
      className="flex relative flex-col items-stretch justify-center gap-4 bg-[#111111] p-4 xl:p-10 rounded-2xl text-xs font-medium hover:-top-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-center">
        <Image
          src={img}
          width={256}
          height={256}
          objectFit="contain"
          alt={pokemon.name}
        />
      </div>
      <div className="flex justify-center">
        <span className="text-lg capitalize">{name}</span>
      </div>
    </div>
  );
};
