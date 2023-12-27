import {
  Dialog,
  DialogContent,
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
    data: {
      accuracy,
      pp,
      power,
      damage_class,
      type: { name: typeName },
    },
  } = useSuspenseQuery(getPokemonMoveByNameOptions(moveName));
  return (
    <Dialog open onOpenChange={(open) => onChangeDialog(open, name)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{capitaliseWord(moveName)}</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>Type:</strong> {capitaliseWord(typeName)}
          </p>
          {damage_class && (
            <p>
              <strong>Class:</strong> {capitaliseWord(damage_class.name)}{" "}
            </p>
          )}
          <p>
            <strong>Power:</strong> {power}
          </p>
          <p>
            <strong>Accuracy:</strong> {accuracy}
          </p>
          <p>
            <strong>PP:</strong> {pp}
          </p>
        </div>
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
