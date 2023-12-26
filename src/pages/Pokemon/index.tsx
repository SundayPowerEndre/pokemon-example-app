import { getPokemonByNameOptions } from "@/hooks/usePokemon";
import { pokemonRoute } from "@/routing/router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useRouter } from "@tanstack/react-router";
import { internalNavigation } from "@/hooks/useNavigate";
import InfoTab from "./Tabs/InfoTab";
import MovesTab from "./Tabs/MovesTab";

const PokemonPage = () => {
  const { name } = pokemonRoute.useParams();
  const { data } = useSuspenseQuery(getPokemonByNameOptions(name));
  const { changePokemonTab } = internalNavigation();

  const {
    latestLocation: { hash },
  } = useRouter();

  return (
    <>
      <article className="flex flex-col gap-4 my-4">
        <Tabs defaultValue={hash} className="w-fit place-self-start">
          <TabsList className=" text-brand-secondary bg-transparent w-full gap-3">
            <TabsTrigger
              value="info"
              className="bg-gray-300 bg-opacity-20 p-2"
              onMouseDown={() => changePokemonTab("info", name)}
            >
              Info
            </TabsTrigger>
            <TabsTrigger
              className="bg-gray-300 bg-opacity-20 p-2 "
              value="moves"
              onMouseDown={() => changePokemonTab("moves", name)}
            >
              Moves
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <InfoTab data={data} />
          </TabsContent>
          <TabsContent value="moves">
            <MovesTab data={data} />
          </TabsContent>
        </Tabs>
        <Outlet />
      </article>
    </>
  );
};
export default PokemonPage;
