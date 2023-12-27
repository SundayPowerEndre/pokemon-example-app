import { z } from "zod";

export const pokemonTabOptions = ["info","moves"] as const;
export const PokemonTabEnum = z.enum(pokemonTabOptions);
export type PokemonTabOptions = z.infer<typeof PokemonTabEnum>;

export const PokemonDialogsSearchParamsSchema = z.object({
  tab: PokemonTabEnum.catch("info"),
});
