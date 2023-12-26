import { apiClient } from "@/api";
import { queryOptions } from "@tanstack/react-query";

export const getAllPokemonOptions = queryOptions({
  queryKey: ["pokemon"],
  queryFn: async () => {
    // add artifical loader delay
    await new Promise((resolve) => setTimeout(resolve, 5000));
    //throw new Error("test");
    return await apiClient.pokemon.listPokemons(0, 9);
  },
});
