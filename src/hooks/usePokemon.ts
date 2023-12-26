import { apiClient } from "@/api";
import { queryOptions } from "@tanstack/react-query";

export const getAllPokemonOptions = queryOptions({
  queryKey: ["list-pokemon"],
  queryFn: async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    //throw new Error("test");
    return await apiClient.pokemon.listPokemons(0, 9);
  },
});

export const getPokemonByNameOptions = (name: string) =>
  queryOptions({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      return await apiClient.pokemon.getPokemonByName(name);
    },
  });

export const getPokemonMoveByNameOptions = (name: string) =>
  queryOptions({
    queryKey: ["pokemon-move", name],
    queryFn: async () => {
      return await apiClient.move.getMoveByName(name);
    },
  });
