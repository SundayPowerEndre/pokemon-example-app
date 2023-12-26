import { getPokemonByNameOptions } from "@/hooks/usePokemon";
import { pokemonRoute } from "@/routing/router";
import { useSuspenseQuery } from "@tanstack/react-query";

const Pokemon = () => {
  const { name } = pokemonRoute.useParams();
  const { data } = useSuspenseQuery(getPokemonByNameOptions(name));

  const {
    sprites: { back_default, front_default },
  } = data;
  return (
    <>
      {back_default && <img src={back_default} alt={`back-${name}`} />}
      {front_default && <img src={front_default} alt={`front-${name}`} />}
    </>
  );
};
export default Pokemon;
