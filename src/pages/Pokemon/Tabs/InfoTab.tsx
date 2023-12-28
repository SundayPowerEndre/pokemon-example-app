import { capitaliseWord, pokemonTypeColors } from "@/lib/utils";
import clsx from "clsx";
import { Pokemon, TYPES as POKEMON_TYPES } from "pokenode-ts";
type PokemonTypes = keyof typeof POKEMON_TYPES;
interface Props {
  data: Pokemon;
}
const Info = ({
  data: {
    id,
    name,
    base_experience,
    height,
    weight,
    abilities,
    types,
    sprites: { front_default },
  },
}: Props) => {
  const typeColor = (types?.at(0)?.type.name.toUpperCase() ??
    POKEMON_TYPES.NORMAL) as PokemonTypes;
  console.log(typeColor);
  return (
    <div
      className={clsx(
        "p-2 sm:p-4 md:p-6 rounded-xl  text-black text-opacity-80 shadow w-full  border-4 border-brand-yellow  aspect-pokemon-card flex flex-col space-y-2 sm:space-y-4 items-center ",
        pokemonTypeColors[typeColor],
      )}
    >
      <div className="text-center grid items-center justify-center place-items-center grid-cols-1 flex-1">
        <h2 className="text-sm sm:text-md md:text-kg lg:text-xl font-bold">
          {capitaliseWord(name)} (#{id})
        </h2>
        <div className="aspect-pokemon-card-image w-32 sm:w-48 md:w-64 lg:w-80 border-4  border-brand-yellow rounded-md bg-brand-yellow-lightest ">
          {front_default && (
            <img
              src={front_default}
              alt={`front-${name}`}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
      <div className="text-sm flex items-center flex-1 w-32 sm:w-48 md:w-64 lg:w-80 ">
        <div>
          <p>
            <strong>Base Experience:</strong> {base_experience}
          </p>
          <p>
            <strong>Height:</strong> {height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {weight / 10} kg
          </p>
          <div>
            <strong>Abilities:</strong>
            <span>
              &nbsp;
              {abilities.map(({ ability: { name } }, index) => (
                <span key={index}>
                  {capitaliseWord(name)}
                  {index < abilities.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </div>
          <div>
            <strong>Types:</strong>
            <span>
              &nbsp;
              {types.map(({ type: { name }, slot }, index) => {
                return (
                  <span key={index}>
                    {capitaliseWord(name)}
                    {`(${slot})`}
                    {index < types.length - 1 ? ", " : ""}
                  </span>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;
