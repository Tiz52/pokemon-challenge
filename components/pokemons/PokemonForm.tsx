import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import Image from "next/image";
import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {db, storage} from "../../firebase";
import {useRouter} from "next/router";
import {pokemonStorage} from "../../utils";

interface FormData {
  abilities: string[];
  height: number;
  id: number;
  evolutions: string[];
  name: string;
  description: string;
  weight: number;
}

type Status = "new" | "pending" | "uploaded" | "not-image";

export const PokemonForm = () => {
  const [newAbilityValue, setNewAbilityValue] = useState<string>("");
  const [newEvolutionValue, setNewEvolutionValue] = useState<string>("");
  const [status, setStatus] = useState<Status>("new");
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
    if (status === "pending") return;

    if (!selectedFile) {
      setStatus("not-image");
      return;
    }

    setStatus("pending");

    const docRef = await addDoc(collection(db, "pokemons"), form);

    const imageRef = ref(storage, `pokemons/${docRef.id}/img`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const imageUrl = await getDownloadURL(imageRef);

        const newPokemonStorage = {
          ...form,
          img: imageUrl,
        };

        pokemonStorage.setPokemon(newPokemonStorage);

        await updateDoc(doc(db, "pokemons", docRef.id), {
          img: imageUrl,
        });
      });
    }

    setStatus("uploaded");

    router.push(`/pokedex/${form.name.toLocaleLowerCase()}`);
  };

  return (
    <div className="flex flex-col w-full gap-4 md:flex-row">
      <div className="flex flex-col gap-12 justify-center bg-[#111111] rounded p-4">
        <div className="relative flex items-center justify-center">
          <Image
            src={selectedFile.length > 0 ? selectedFile : "/who.png"}
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

      <div className="flex flex-col  gap-3 flex-auto px-2 py-4 bg-[#111111] rounded">
        {/* Form Name */}

        <div className="p-4 text-sm bg-black rounded">
          <span className="font-bold">Nombre:</span>
          <input
            type="text"
            className="w-full py-2 bg-black border-b-2 focus:outline-none focus:shadow-outline"
            autoComplete="off"
            placeholder="Nombre"
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

        <div className="p-4 text-sm bg-black rounded">
          <span className="font-bold">Número de la Pokedéx:</span>
          <input
            type="number"
            className="w-full py-2 bg-black border-b-2 focus:outline-none focus:shadow-outline"
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

        <div className="p-4 text-sm bg-black rounded">
          <span className="font-bold">Peso(lb):</span>
          <input
            type="number"
            className="w-full py-2 bg-black border-b-2 focus:outline-none focus:shadow-outline"
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

        <div className="p-4 text-sm bg-black rounded">
          <span className="font-bold">Altura(ft):</span>
          <input
            type="number"
            className="w-full py-2 bg-black border-b-2 focus:outline-none focus:shadow-outline"
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

        <div className="p-4 text-sm bg-black rounded">
          <span className="font-bold">Descripción:</span>
          <textarea
            className="w-full py-2 bg-black border-b-2 focus:outline-none focus:shadow-outline"
            autoComplete="off"
            placeholder="Descripción"
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

        <div className="flex flex-col gap-2 p-4 bg-black rounded">
          <div className="text-sm">
            <span className="font-bold">
              Ingrese el nombre de una habilidad:
            </span>
            <input
              type="text"
              className="w-full py-2 bg-black border-b-2 focus:outline-none focus:shadow-outline"
              autoComplete="off"
              value={newAbilityValue}
              placeholder="Ej: nombre de la habilidad"
              onChange={(e) => setNewAbilityValue(e.target.value)}
              onKeyUp={({code}) =>
                code === "Enter" ? onNewAbility() : undefined
              }
            />
          </div>

          <span className="text-xs">
            Presiona [enter] para agregar a la lista de habilidades
          </span>

          <div className="flex flex-col h-20 gap-2 text-sm">
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

        <div className="flex flex-col gap-2 p-4 bg-black rounded">
          <div className="text-sm">
            <span className="font-bold">
              Ingrese el nombre de una evolución:
            </span>
            <input
              type="text"
              className="w-full py-2 border-b-2 bg-[#111111] focus:outline-none focus:shadow-outline"
              autoComplete="off"
              value={newEvolutionValue}
              placeholder="Ej: nombre de la evolución"
              onChange={(e) => setNewEvolutionValue(e.target.value)}
              onKeyUp={({code}) =>
                code === "Enter" ? onNewEvolution() : undefined
              }
            />
          </div>

          <span className="text-xs">
            Presiona [enter] para agregar a la lista de evoluciones
          </span>

          <div className="flex flex-col h-20 gap-2 text-sm">
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

        <div className="flex items-center justify-center">
          {status === "pending" && (
            <svg
              role="status"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
          <button
            className={`inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500  group-hover:from-purple-600 group-hover:to-blue-500
            ${status !== "pending" ? "" : ""}
            disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={status === "pending"}
            onClick={handleSubmit(onSubmit)}
          >
            <span
              className={`px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md ${
                status === "pending"
                  ? ""
                  : "group-hover:bg-opacity-0 hover:text-white"
              }`}
            >
              {status === "pending" ? "cargando datos" : "crear pokémon"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
