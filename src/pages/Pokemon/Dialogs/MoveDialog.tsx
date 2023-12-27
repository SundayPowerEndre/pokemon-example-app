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
      <DialogContent >
        <DialogHeader>
          <DialogTitle>{capitaliseWord(moveName)}</DialogTitle>
          <DialogDescription className=" text-black">
            <p>Type: {capitaliseWord(typeName)}</p>
            {damage_class && <p>Class: {capitaliseWord(damage_class.name)} </p>}
            <p>Power: {power}</p>
            <p>Accuracy: {accuracy}</p>
            <p>PP: {pp}</p>
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
