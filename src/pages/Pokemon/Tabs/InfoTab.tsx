import { capitaliseWord } from "@/lib/utils";
import { Pokemon } from "pokenode-ts";

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
    sprites: { front_default, back_default },
  },
}: Props) => (
  <div className="p-6 rounded-xl shadow-md flex flex-col items-center space-y-4">
    <div className="text-center">
      <h2 className="text-xl font-bold">
        {capitaliseWord(name)} (#{id})
      </h2>
      <div className=" flex flex-row">
        {front_default && (
          <img
            src={front_default}
            alt={`front-${name}`}
            className="w-32 h-32"
          />
        )}
        {back_default && (
          <img src={back_default} alt={`back-${name}`} className="w-32 h-32" />
        )}
      </div>
    </div>
    <div className="text-sm">
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
          {types.map(({ type: { name }, slot }, index) => (
            <span key={index}>
              {capitaliseWord(name)}
              {`(${slot})`}
              {index < abilities.length - 1 ? ", " : ""}
            </span>
          ))}
        </span>
      </div>
    </div>
  </div>
);
export default Info;
