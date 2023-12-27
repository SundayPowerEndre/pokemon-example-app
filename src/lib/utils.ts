import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import doubleMetaphone from "talisman/phonetics/double-metaphone";
import jaroWinkler from "talisman/metrics/jaro-winkler";
import Fuse from "fuse.js";

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
  const targetPhonetics = doubleMetaphone(pokemon);
  const inputPhonetics = doubleMetaphone(search);
  const fuse = new Fuse([pokemon], { includeScore: true });
  const fuzzyMatch = fuse.search(search);
  const isFuzzyMatch =
    fuzzyMatch.length > 0 && fuzzyMatch[0].score! > FUZZY_THRESHOLD;
  const phoneticSimilarity = jaroWinkler(targetPhonetics, inputPhonetics);

  const isPhoneticMatch = phoneticSimilarity > PHONETIC_THRESHOLD;
  return isFuzzyMatch || isPhoneticMatch;
}
