import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitaliseWord } from "@/lib/utils";
import { PokemonTabEnum, PokemonTabOptions, pokemonTabOptions } from "@/routing/routeValidation";
import InfoTab from "./InfoTab";
import MovesTab from "./MovesTab";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonByNameOptions } from "@/hooks/usePokemon";
import { internalNavigation } from "@/hooks/useNavigate";

interface Props {
  name: string;
  tab: PokemonTabOptions;
}

export const PokemonTabs = ({ name, tab }: Props) => {
  const { data } = useSuspenseQuery(getPokemonByNameOptions(name));
  const { changePokemonTab } = internalNavigation();
  return (
    <Tabs value={tab} className="w-fit place-self-start">
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
  );
};
