import { Navigate, Route } from "@tanstack/react-router";
import { rootRoute } from ".";
import {
  getAllPokemonOptions,
  getPokemonByNameOptions,
  getPokemonMoveByNameOptions,
} from "@/hooks/usePokemon";
import ListPokemon from "@/pages/ListPokemons";
import PokemonPage from "@/pages/Pokemon";
import MoveDialog from "@/pages/Pokemon/Dialogs/MoveDialog";
import PokemonLoader from "@/components/Loader";
import { PokemonDialogsSearchParamsSchema } from "./routeValidation";

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
  component: PokemonPage,
  validateSearch: (search) => PokemonDialogsSearchParamsSchema.parse(search),
});

export const pokemoneMoveDialogRoute = new Route({
  getParentRoute: () => pokemonRoute,
  path: "/$move",
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(getPokemonMoveByNameOptions(params.move)),
  component: MoveDialog,
  pendingComponent: () => {
    return <PokemonLoader showInDialog={true} />;
  },
});

export const mainRouteTree = [
  indexRoute,
  listPokemonsRoute,
  pokemonRoute,
  pokemoneMoveDialogRoute,
];
