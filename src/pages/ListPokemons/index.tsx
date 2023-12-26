import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllPokemonOptions } from "@/hooks/usePokemon";
import ListItem from "./ListItem";

function ListPokemon() {
  const { data } = useSuspenseQuery(getAllPokemonOptions);

  return (
    <article className="flex flex-col items-center gap-1  min-w ">
      {data.results.map((item) => (
        <ListItem item={item} key={item.url} />
      ))}
    </article>
  );
}

export default ListPokemon;
