import { Navigate, Route  } from "@tanstack/react-router";
import { rootRoute } from ".";
import { getAllPokemonOptions, getPokemonByNameOptions } from "@/hooks/usePokemon";
import ListPokemon from "@/pages/ListPokemons";
import Pokemon from "@/pages/Pokemon";

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

export const pokemonRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/pokemon/$name",
    loader: ({ context: { queryClient }, params }) =>
      queryClient.ensureQueryData(getPokemonByNameOptions(params.name)),
    component: Pokemon,
  });


export const mainRouteTree = [indexRoute, listPokemonsRoute, pokemonRoute];
