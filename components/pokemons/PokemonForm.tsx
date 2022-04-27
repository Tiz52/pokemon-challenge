import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import Image from "next/image";
import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {db, storage} from "../../firebase";
import {useRouter} from "next/router";

interface FormData {
  abilities: string[];
  height: number;
  id: number;
  evolutions: string[];
  name: string;
  description: string;
  weight: number;
}

export const PokemonForm = () => {
  const [newAbilityValue, setNewAbilityValue] = useState<string>("");
  const [newEvolutionValue, setNewEvolutionValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState("");

  const fileInput = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      abilities: [],
      height: 0,
      id: 0,
      evolutions: [],
      name: "",
      description: "",
      weight: 0,
    },
  });

  const onNewAbility = () => {
    const newAbility = newAbilityValue.trim().toLocaleLowerCase();
    setNewAbilityValue("");
    const currentAbilities = getValues("abilities");

    if (currentAbilities.includes(newAbility)) {
      return;
    }

    setValue("abilities", [...currentAbilities, newAbility], {
      shouldValidate: true,
    });
  };

  const onNewEvolution = () => {
    const newEvolution = newEvolutionValue.trim().toLocaleLowerCase();
    setNewEvolutionValue("");
    const currentAbilities = getValues("evolutions");

    if (currentAbilities.includes(newEvolution)) {
      return;
    }

    setValue("evolutions", [...currentAbilities, newEvolution], {
      shouldValidate: true,
    });
  };

  const onDeleteAbility = (tag: string) => {
    const newAbilities = getValues("abilities").filter((t) => t !== tag);

    setValue("abilities", [...newAbilities], {shouldValidate: true});
  };

  const onDeleteEvolution = (tag: string) => {
    const newEvolutions = getValues("evolutions").filter((t) => t !== tag);

    setValue("evolutions", [...newEvolutions], {shouldValidate: true});
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files?.length) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result as string);
    };
  };

  const onSubmit = async (form: FormData) => {
    // let pokemons = [];
    // pokemons.push(form);
    // localStorage.setItem("pokemons", JSON.stringify(pokemons));

    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "pokemons"), form);

    const imageRef = ref(storage, `pokemons/${docRef.id}/img`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "pokemons", docRef.id), {
          img: imageUrl,
        });
      });
    }
    setLoading(false);

    router.push("/");
  };

  return (
    <div className="flex flex-col w-full gap-4 md:flex-row">
      <div className="flex flex-col gap-12 justify-center bg-[#111111] rounded p-4">
        <div className="relative flex items-center justify-center">
          <Image
            src={selectedFile.length > 0 ? selectedFile : "/placeholder.jpg"}
            alt="placeholder"
            width={320}
            height={320}
          />
        </div>

        <div className="flex justify-center">
          <input
            type="file"
            className="hidden"
            ref={fileInput}
            onChange={onFileChange}
          />
          <button
            className="inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500"
            onClick={() => fileInput.current!.click()}
          >
            <span className="px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white">
              agregar foto
            </span>
          </button>
        </div>
      </div>

      <form
        className="flex flex-col gap-3 flex-auto p-4 bg-[#111111] rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Form Name */}

        <div className="text-sm">
          <span className="font-bold">Nombre:</span>
          <input
            type="text"
            className="w-full py-2 border-b-2 bg-[#111111] focus:outline-none focus:shadow-outline"
            autoComplete="off"
            {...register("name", {
              required: "El nombre es requerido",
              minLength: {value: 2, message: "Mínimo 2 caracteres"},
            })}
          />
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
        </div>

        {/* Form ID */}

        <div className="text-sm">
          <span className="font-bold">Número de la Pokedéx:</span>
          <input
            type="number"
            className="w-full py-2 border-b-2 bg-[#111111] focus:outline-none focus:shadow-outline"
            autoComplete="off"
            {...register("id", {
              required: "El número es requerido",
              minLength: {value: 0, message: "Mínimo de valor 0"},
            })}
          />
          {errors.id && (
            <span className="text-red-600">{errors.id.message}</span>
          )}
        </div>

        {/* Form Weight */}

        <div className="text-sm">
          <span className="font-bold">Peso(lb):</span>
          <input
            type="number"
            className="w-full py-2 border-b-2 bg-[#111111] focus:outline-none focus:shadow-outline"
            autoComplete="off"
            {...register("weight", {
              required: "El peso es requerido",
              minLength: {value: 0, message: "Mínimo de valor 0"},
            })}
          />
          {errors.weight && (
            <span className="text-red-600">{errors.weight.message}</span>
          )}
        </div>

        {/* Form Height */}

        <div className="text-sm">
          <span className="font-bold">Altura(ft):</span>
          <input
            type="number"
            className="w-full py-2 border-b-2 bg-[#111111] focus:outline-none focus:shadow-outline"
            autoComplete="off"
            {...register("height", {
              required: "La altura es requerida",
              minLength: {value: 0, message: "Mínimo de valor 0"},
            })}
          />
          {errors.height && (
            <span className="text-red-600">{errors.height.message}</span>
          )}
        </div>

        {/* Form Description */}

        <div className="text-sm">
          <span className="font-bold">Descripción:</span>
          <textarea
            className="w-full py-2 border-b-2 bg-[#111111] focus:outline-none focus:shadow-outline"
            autoComplete="off"
            {...register("description", {
              required: "La descripción es requerida",
              minLength: {value: 2, message: "Mínimo de valor 2"},
            })}
          />
          {errors.description && (
            <span className="text-red-600">{errors.description.message}</span>
          )}
        </div>

        {/* Form Abilities */}

        <div className="flex flex-col gap-2">
          <div className="text-sm">
            <span className="font-bold">
              Ingrese el nombre de una habilidad:
            </span>
            <input
              type="text"
              className="w-full py-2 border-b-2 bg-[#111111] focus:outline-none focus:shadow-outline"
              autoComplete="off"
              value={newAbilityValue}
              onChange={(e) => setNewAbilityValue(e.target.value)}
              onKeyUp={({code}) =>
                code === "Space" ? onNewAbility() : undefined
              }
            />
          </div>

          <span className="text-xs">Presiona [spacebar] para agregar</span>

          <div className="flex flex-col h-24 gap-2 text-sm">
            <span className="font-bold">Habilidades:</span>
            <div className="flex gap-2">
              {getValues("abilities").map((ability, index) => (
                <div
                  className="flex gap-2 px-2 py-1 border-2 rounded-2xl "
                  key={index}
                >
                  <span>{ability}</span>
                  <button className="" onClick={() => onDeleteAbility(ability)}>
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Evolution */}

        <div className="flex flex-col gap-2">
          <div className="text-sm">
            <span className="font-bold">
              Ingrese el nombre de una evolución:
            </span>
            <input
              type="text"
              className="w-full py-2 border-b-2 bg-[#111111] focus:outline-none focus:shadow-outline"
              autoComplete="off"
              value={newEvolutionValue}
              onChange={(e) => setNewEvolutionValue(e.target.value)}
              onKeyUp={({code}) =>
                code === "Space" ? onNewEvolution() : undefined
              }
            />
          </div>

          <span className="text-xs">Presiona [spacebar] para agregar</span>

          <div className="flex flex-col h-24 gap-2 text-sm">
            <span className="font-bold">Evoluciones:</span>
            <div className="flex gap-2">
              {getValues("evolutions").map((ability, index) => (
                <div
                  className="flex gap-2 px-2 py-1 border-2 rounded-2xl "
                  key={index}
                >
                  <span>{ability}</span>
                  <button
                    className=""
                    onClick={() => onDeleteEvolution(ability)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Image */}

        <div className="flex justify-center">
          <button className="inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500">
            <span className="px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white">
              crear pokémon
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
