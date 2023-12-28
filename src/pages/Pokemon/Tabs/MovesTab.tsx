import ClickableCard from "@/components/ClickableCard";
import { internalNavigation } from "@/hooks/useNavigate";
import { capitaliseWord } from "@/lib/utils";
import { type Pokemon } from "pokenode-ts";

interface Props {
  data: Pokemon;
}

const MovesTab = ({ data: { moves, name } }: Props) => {
  const { openMoveDialog } = internalNavigation();
  return (
    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {moves.map(({ move: { name: moveName } }, index) => (
        <ClickableCard
          onClick={() => openMoveDialog(name, moveName)}
          key={index}
        >
          {capitaliseWord(moveName)}
        </ClickableCard>
      ))}
    </div>
  );
};

export default MovesTab;
