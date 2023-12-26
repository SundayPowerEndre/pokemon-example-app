import { useNavigate } from "@tanstack/react-router";
import { NamedAPIResource } from "pokenode-ts";

interface Props {
  item: NamedAPIResource;
}
const ListItem = ({ item }: Props) => {
  const captalisedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
  const navigate = useNavigate({ from: "/listPokemons" });
  return (
    <button
      onClick={() => navigate({ to: "/pokemon/$name" , params: { name: item.name }})}
      className="p-4 text-lg  border border-brand-secondary rounded-3xl text-center"
    >
      {captalisedName}
    </button>
  );
};
export default ListItem;
