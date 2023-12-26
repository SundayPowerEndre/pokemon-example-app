import { capitaliseWord } from "@/lib/utils";
import { Pokemon } from "pokenode-ts";

interface Props {
  data: Pokemon;
}

const MovesTab = ({ data: { moves } }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
      {moves.map(({ move: { name } }, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded p-4 text-center"
        >
          {capitaliseWord(name)}
        </div>
      ))}
    </div>
  );
};

export default MovesTab;
