import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { internalNavigation } from "@/hooks/useNavigate";
import { getPokemonMoveByNameOptions } from "@/hooks/usePokemon";
import { capitaliseWord } from "@/lib/utils";
import { pokemoneMoveDialogRoute } from "@/routing/router";
import { useSuspenseQuery } from "@tanstack/react-query";

const MoveDialog = () => {
  const { name, move: moveName } = pokemoneMoveDialogRoute.useParams();
  const {
    data: { accuracy, effect_chance, pp, priority, power },
  } = useSuspenseQuery(getPokemonMoveByNameOptions(moveName));
  return (
    <Dialog open onOpenChange={(open) => onChangeDialog(open, name)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{capitaliseWord(moveName)}</DialogTitle>
          <DialogDescription>
            <p>Accuracy: {accuracy}</p>
            <p>Effect Chance: {effect_chance}</p>
            <p>PP: {pp}</p>
            <p>Priority: {priority}</p>
            <p>Power: {power}</p>
            {/* Add more properties as needed */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

function onChangeDialog(open: boolean, name: string) {
  const { closeMoveDialog } = internalNavigation();
  if (!open) {
    closeMoveDialog(name);
  }
}

export default MoveDialog;
