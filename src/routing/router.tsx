import { Navigate, Route } from "@tanstack/react-router";
import { rootRoute } from ".";
import { getAllPokemonOptions } from "@/hooks/usePokemon";
import ListPokemon from "@/pages/ListPokemons";

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate from="/" to="/listPokemons" />,
});

const listPokemonsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/listPokemons",
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(getAllPokemonOptions),
  component: ListPokemon,
});

export const mainRouteTree = [indexRoute, listPokemonsRoute];
