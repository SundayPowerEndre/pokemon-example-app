import ClickableCard from "@/components/ClickableCard";
import { capitaliseWord } from "@/lib/utils";
import { pokemonRoute } from "@/routing/router";
import { useNavigate } from "@tanstack/react-router";
import { type NamedAPIResource } from "pokenode-ts";

interface Props {
  item: NamedAPIResource;
}
const ListItem = ({ item }: Props) => {
  const captalisedName = capitaliseWord(item.name);
  const navigate = useNavigate({ from: "/listPokemons" });
  return (
    <ClickableCard
      onClick={() =>
        navigate({
          to: pokemonRoute.to,
          params: { name: item.name },
          search: { tab: "info" },
        })
      }
    >
      {captalisedName}
    </ClickableCard>
  );
};
export default ListItem;
