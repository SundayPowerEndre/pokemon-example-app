import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { internalNavigation } from "@/hooks/useNavigate";
import { getPokemonMoveByNameOptions } from "@/hooks/usePokemon";
import {
  capitaliseWord,
  cn,
  getColorFromType,
  pokemonTypeColors,
} from "@/lib/utils";
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
  const typeColor = getColorFromType(typeName);
  return (
    <Dialog
      open
      onOpenChange={async (open) => await onChangeDialog(open, name)}
    >
      <DialogContent className={cn(pokemonTypeColors[typeColor])}>
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

async function onChangeDialog(open: boolean, name: string) {
  const { closeMoveDialog } = internalNavigation();
  if (!open) {
    await closeMoveDialog(name);
  }
}

export default MoveDialog;
