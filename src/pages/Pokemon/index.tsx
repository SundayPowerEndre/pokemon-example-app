import { getPokemonByNameOptions } from "@/hooks/usePokemon";
import { pokemonRoute } from "@/routing/router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet } from "@tanstack/react-router";
import { internalNavigation } from "@/hooks/useNavigate";
import InfoTab from "./Tabs/InfoTab";
import MovesTab from "./Tabs/MovesTab";
import { PokemonTabEnum, pokemonTabOptions } from "@/routing/routeValidation";
import { capitaliseWord } from "@/lib/utils";

const PokemonPage = () => {
  const { name } = pokemonRoute.useParams();
  const { tab } = pokemonRoute.useSearch();
  const { data } = useSuspenseQuery(getPokemonByNameOptions(name));
  const { changePokemonTab } = internalNavigation();

  return (
    <>
      <article className="flex flex-col gap-4 my-4 self-start">
        <Tabs defaultValue={tab} className="w-fit place-self-start">
          <TabsList className=" text-brand-secondary bg-transparent w-full gap-3">
            {pokemonTabOptions.map((tab) => {
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="bg-gray-300 bg-opacity-20 p-2"
                  onMouseDown={() => changePokemonTab(tab, name)}
                >
                  {capitaliseWord(tab)}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <TabsContent value={PokemonTabEnum.Values.info}>
            <InfoTab data={data} />
          </TabsContent>
          <TabsContent value={PokemonTabEnum.Values.moves}>
            <MovesTab data={data} />
          </TabsContent>
        </Tabs>
        <Outlet />
      </article>
    </>
  );
};
export default PokemonPage;
