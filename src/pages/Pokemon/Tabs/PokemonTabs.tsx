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
            <Button
              key={tab}
              className={clsx(
                " bg-gray-600 bg-opacity-20 p-2 min-w-[100px] rounded-xl text-center text-sm",
                selectedTab === tab && "bg-opacity-100"
              )}
              onMouseDown={() => changePokemonTab(tab, name)}
            >
              {capitaliseWord(tab)}
            </Button>
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
