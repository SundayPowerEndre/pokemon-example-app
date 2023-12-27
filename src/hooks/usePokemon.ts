import { apiClient } from "@/api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { NamedAPIResourceList } from "pokenode-ts";

export const getAllPokemonOptions = infiniteQueryOptions({
  queryKey: ["list-pokemon"],
  initialPageParam: { offset: 0, limit: 50 },
  queryFn: async ({
    pageParam: { offset, limit } = { offset: 0, limit: 50 },
  }) => {
    const response = await apiClient.pokemon.listPokemons(offset, limit);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { results: _, ...rest } = response;
    return { pages: [response], pageParams: [{ offset, limit }], ...rest } as unknown as {results:NamedAPIResourceList["results"], pageParams: {offset:number, limit:number[]},next?:string, previous?:string, count?:number };
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
