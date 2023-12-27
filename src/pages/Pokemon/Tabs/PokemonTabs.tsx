import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { capitaliseWord } from "@/lib/utils";
import {
  PokemonTabEnum,
  PokemonTabOptions,
  pokemonTabOptions,
} from "@/routing/routeValidation";
import InfoTab from "./InfoTab";
import MovesTab from "./MovesTab";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonByNameOptions } from "@/hooks/usePokemon";
import { internalNavigation } from "@/hooks/useNavigate";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface Props {
  name: string;
  tab: PokemonTabOptions;
}

export const PokemonTabs = ({ name, tab: selectedTab }: Props) => {
  const { data } = useSuspenseQuery(getPokemonByNameOptions(name));
  const { changePokemonTab } = internalNavigation();
  return (
    <Tabs value={selectedTab} className="w-fit place-self-start">
      <TabsList className=" text-brand-secondary bg-transparent w-full gap-3">
        {pokemonTabOptions.map((tab) => {
          return (
            <div className="mb-6" key={tab}>
              <button
                className={clsx(
                  " bg-transparent bg-opacity-20 p-2 min-w-[100px] rounded-xl text-center text-sm text-white"
                )}
                onMouseDown={() => changePokemonTab(tab, name)}
              >
                {capitaliseWord(tab)}
              </button>
              {selectedTab === tab && (
                <div className="w-full h-1 bg-brand-secondary" />
              )}
            </div>
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
  );
};
