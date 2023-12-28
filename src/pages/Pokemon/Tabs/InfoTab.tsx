import {
  capitaliseWord,
  cn,
  getColorFromType,
  pokemonTypeColors,
} from "@/lib/utils";
import { type Pokemon } from "pokenode-ts";

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
  const typeColor = getColorFromType(types?.at(0)?.type?.name);

  return (
    <div
      className={cn(
        "flex aspect-pokemon-card w-full flex-col  items-center space-y-2 rounded-xl border-4  border-brand-yellow p-2  text-black text-opacity-80 shadow sm:space-y-4 sm:p-4 md:p-6 ",
        pokemonTypeColors[typeColor],
      )}
    >
      <div className="grid flex-1 grid-cols-1 place-items-center items-center justify-center text-center">
        <h2 className="sm:text-md md:text-kg text-sm font-bold lg:text-xl">
          {capitaliseWord(name)} (#{id})
        </h2>
        <div className="aspect-pokemon-card-image w-32 rounded-md border-4 border-brand-yellow bg-brand-yellow-lightest  sm:w-48 md:w-64 lg:w-80 ">
          {front_default && (
            <img
              src={front_default}
              alt={`front-${name}`}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex w-32 flex-1 items-center text-sm sm:w-48 md:w-64 lg:w-80 ">
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
