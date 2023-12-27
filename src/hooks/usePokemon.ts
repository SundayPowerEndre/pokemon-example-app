import { apiClient } from "@/api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const getAllPokemonOptions = infiniteQueryOptions({
  queryKey: ["list-pokemon"],
  initialPageParam: { offset: 0, limit: 12 * 4 },
  queryFn: async ({
    pageParam: { offset, limit } = { offset: 0, limit: 12 * 4 },
  }) => {
    // I do not understand the underlying typing system well enough to prioritise fixing this...
    const response = await apiClient.pokemon.listPokemons(offset, limit);
    const { results: _, ...rest } = response;
    const wrangledData = {
      results: response.results,
      pages: [response],
      pageParams: [{ offset, limit }],
      ...rest,
    };
    const output: Omit<typeof wrangledData, "pages"> = wrangledData;
    return output;
  },
  getNextPageParam: (lastPage) => {
    if (!lastPage) return undefined;
    if (lastPage && lastPage.next) {
      const url = new URL(lastPage.next);
      const params = new URLSearchParams(url.search);
      const offset = Number(params.get("offset"));
      const limit = Number(params.get("limit"));
      return { offset, limit };
    }
    return null;
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
