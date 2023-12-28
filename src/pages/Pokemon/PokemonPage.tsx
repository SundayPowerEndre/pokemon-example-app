import { pokemonRoute } from "@/routing/router";
import { Outlet } from "@tanstack/react-router";
import { PokemonTabs } from "./Tabs";

export const PokemonPage = () => {
  const { name } = pokemonRoute.useParams();
  const { tab } = pokemonRoute.useSearch();

  return (
    <>
      <article className="my-4 flex min-w-[50vw] flex-col items-center gap-4">
        <PokemonTabs name={name} tab={tab} />
        <Outlet />
      </article>
    </>
  );
};
