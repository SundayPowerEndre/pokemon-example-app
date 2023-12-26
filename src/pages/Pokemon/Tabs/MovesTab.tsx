import { internalNavigation } from "@/hooks/useNavigate";
import { capitaliseWord } from "@/lib/utils";
import { Pokemon } from "pokenode-ts";

interface Props {
  data: Pokemon;
}

const MovesTab = ({ data: { moves, name } }: Props) => {
  const { openMoveDialog } = internalNavigation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
      {moves.map(({ move: { name: moveName } }, index) => (
        <button
          onClick={() => openMoveDialog(name, moveName)}
          key={index}
          className="border border-gray-300 rounded p-4 text-center"
        >
          {capitaliseWord(moveName)}
        </button>
      ))}
    </div>
  );
};

export default MovesTab;
