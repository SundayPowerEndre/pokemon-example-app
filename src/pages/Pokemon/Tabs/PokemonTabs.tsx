import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { capitaliseWord } from "@/lib/utils";
import {
  PokemonTabEnum,
  type PokemonTabOptions,
  pokemonTabOptions,
} from "@/routing/routeValidation";
import InfoTab from "./InfoTab";
import MovesTab from "./MovesTab";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonByNameOptions } from "@/hooks/usePokemon";
import { internalNavigation } from "@/hooks/useNavigate";
import clsx from "clsx";

interface Props {
  name: string;
  tab: PokemonTabOptions;
}

export const PokemonTabs = ({ name, tab: selectedTab }: Props) => {
  const { data } = useSuspenseQuery(getPokemonByNameOptions(name));
  const { changePokemonTab } = internalNavigation();
  return (
    <Tabs value={selectedTab} className="w-fit">
      <TabsList className=" w-full gap-3 bg-transparent text-brand-secondary ">
        {pokemonTabOptions.map((tab) => {
          return (
            <div className="mb-6" key={tab}>
              <button
                className={clsx(
                  " min-w-[100px] rounded-xl bg-transparent bg-opacity-20 p-2 text-center text-xl text-white",
                )}
                onMouseDown={() => changePokemonTab(tab, name)}
              >
                {capitaliseWord(tab)}
              </button>
              {selectedTab === tab && (
                <div className="h-1 w-full bg-brand-secondary" />
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
