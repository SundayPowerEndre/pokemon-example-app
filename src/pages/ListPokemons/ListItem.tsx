import { capitaliseWord } from "@/lib/utils";
import { pokemonRoute } from "@/routing/router";
import { useNavigate } from "@tanstack/react-router";
import { NamedAPIResource } from "pokenode-ts";

interface Props {
  item: NamedAPIResource;
}
const ListItem = ({ item }: Props) => {
  const captalisedName = capitaliseWord(item.name);
  const navigate = useNavigate({ from: "/listPokemons" });
  return (
    <button
      onClick={() =>
        navigate({ to: pokemonRoute.to, params: { name: item.name } })
      }
      className="p-4 text-lg  border border-brand-secondary rounded-3xl text-center"
    >
      {captalisedName}
    </button>
  );
};
export default ListItem;
