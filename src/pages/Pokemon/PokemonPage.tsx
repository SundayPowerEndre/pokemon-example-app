
import { pokemonRoute } from "@/routing/router";
import { Outlet } from "@tanstack/react-router";
import { PokemonTabs } from "./Tabs";

export const PokemonPage = () => {
  const { name } = pokemonRoute.useParams();
  const { tab } = pokemonRoute.useSearch();

  return (
    <>
      <article className="flex flex-col gap-4 my-4 self-start">
        <PokemonTabs name={name} tab={tab} />
        <Outlet />
      </article>
    </>
  );
};
