import ShinyAnimation from "@/components/ShinyAnimation";
import {
  capitaliseWord,
  cn,
  getColorFromType,
  pokemonTypeColors,
} from "@/lib/utils";
import { type Pokemon } from "pokenode-ts";
import { useState } from "react";

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
    sprites: { front_default, front_shiny },
  },
}: Props) => {
  const typeColor = getColorFromType(types?.at(0)?.type?.name);
  const [isShiny, setIsShiny] = useState(false);

  const toggleShiny = () => {
    setIsShiny(!isShiny);
  };

  return (
    <div
      onClick={toggleShiny}
      className={cn(
        "flex aspect-pokemon-card w-full cursor-pointer flex-col items-center space-y-2  rounded-xl border-4  border-brand-yellow p-1 text-black text-opacity-80 shadow-md  transition-all duration-300 hover:scale-105 hover:shadow-lg sm:space-y-4 sm:p-4 md:p-6",
        pokemonTypeColors[typeColor],
      )}
    >
      <div className="grid flex-1 grid-cols-1 place-items-center items-center justify-center text-center">
        <h2 className="mb-2 text-sm font-bold sm:text-sm md:text-lg lg:text-xl">
          {capitaliseWord(name)} (#{id})
        </h2>
        <div className="aspect-pokemon-card-image w-32 rounded-md border-4 border-brand-yellow bg-brand-yellow-lightest  sm:w-48 md:w-64 lg:w-80">
          {front_default && front_shiny && (
            <div className="relative flex h-full w-full items-center justify-center">
              <img
                src={isShiny ? front_shiny : front_default}
                alt={`front-${name}`}
                className="absolute h-full w-full object-contain"
              />
              {isShiny && <ShinyAnimation className="absolute" />}
            </div>
          )}
          {front_default && !front_shiny && (
            <img
              src={front_default}
              alt={`front-${name}`}
              className="h-full w-full object-contain"
            />
          )}
        </div>
      </div>
      <div className="flex w-full flex-1 items-center p-2 text-xs sm:p-4 sm:text-sm md:p-6 md:text-lg lg:text-xl">
        <div>
          <p>
            <strong className="whitespace-break-spaces">
              Base Experience:
            </strong>
            {""}
            {base_experience}
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
                  {index < abilities.length - 1 ? "," : ""}
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
                    {index < types.length - 1 ? "," : ""}
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
