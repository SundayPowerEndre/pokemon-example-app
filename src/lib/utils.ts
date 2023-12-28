import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import doubleMetaphone from "talisman/phonetics/double-metaphone";
import jaroWinkler from "talisman/metrics/jaro-winkler";
import Fuse from "fuse.js";
import { TYPES as POKEMON_TYPES } from "pokenode-ts";
export type PokemonTypes = keyof typeof POKEMON_TYPES;
const FUZZY_THRESHOLD = 0.5 as const;
const PHONETIC_THRESHOLD = 0.4 as const;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitaliseWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Function to check if the word matches using fuzzy and phonetic algorithms
export function mightBePokemon(pokemon: string, search: string) {
  if (pokemon.toLowerCase().startsWith(search.toLowerCase())) {
    return true;
  }

  const fuse = new Fuse([pokemon], { includeScore: true });
  const fuzzyMatch = fuse.search(search);
  const isFuzzyMatch =
    fuzzyMatch.length > 0 && fuzzyMatch[0].score! > FUZZY_THRESHOLD;
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  const targetPhonetics = doubleMetaphone(pokemon);
  const inputPhonetics = doubleMetaphone(search);
  const phoneticSimilarity = jaroWinkler(targetPhonetics, inputPhonetics);
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  /* eslint-enable @typescript-eslint/no-unsafe-call */

  const isPhoneticMatch = phoneticSimilarity > PHONETIC_THRESHOLD;
  return isFuzzyMatch || isPhoneticMatch;
}
export const pokemonTypeColors = {
  NORMAL: "bg-gray-400",
  FIGHTING: "bg-pastel-earth",
  FLYING: "bg-sky-200",
  POISON: "bg-purple-300",
  GROUND: "bg-pastel-earth",
  ROCK: "bg-pastel-rock",
  BUG: "bg-brand-green",
  GHOST: "bg-brand-lavender",
  STEEL: "bg-zinc-200",
  FIRE: "bg-red-300",
  WATER: "bg-indigo-200",
  GRASS: "bg-brand-green-dark",
  ELECTRIC: "bg-yellow-100",
  PSYCHIC: "bg-fuchsia-200",
  ICE: "bg-blue-100",
  DRAGON: "bg-indigo-400",
  DARK: "bg-gray-600",
  FAIRY: "bg-brand-secondary-light",
  UNKNOWN: "bg-gray-300",
  SHADOW: "bg-gray-700",
} as const;

export const getColorFromType = (typeString: string | undefined) => {
  const maybeColor = typeString?.toUpperCase() ?? "";

  const typeColor = (
    Object.keys(POKEMON_TYPES).includes(maybeColor)
      ? maybeColor
      : POKEMON_TYPES.NORMAL.toString().toUpperCase()
  ) as PokemonTypes;
  return typeColor;
};
