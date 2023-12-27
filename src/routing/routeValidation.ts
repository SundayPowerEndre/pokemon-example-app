import { z } from 'zod'

export const pokemonTabOptions = ["moves","info"] as const; // as const is used to get a readonly tuple type
export const PokemonTabEnum = z.enum(pokemonTabOptions);
export type PokemonTabOptions = z.infer<typeof PokemonTabEnum>;

export const PokemonDialogsSearchParamsSchema = z.object({
  tab: PokemonTabEnum.catch('info'),
})
