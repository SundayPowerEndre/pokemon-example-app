import { router } from "@/routing";
import { PokemonTabOptions } from "@/routing/routeValidation";

export const internalNavigation = () => {
  const changePokemonTab = (newTab: PokemonTabOptions, name: string) => {
    router.navigate({
      to: "/pokemon/$name",
      from: "/pokemon/$name",
      params: { name },
      search: { tab: newTab },
    });
  };

  const openMoveDialog = (name: string, move: string) => {
    router.navigate({
      to: "/pokemon/$name/$move",
      from: "/pokemon/$name",
      params: { name, move },
      search(prev) {
        return { tab: prev.tab ? prev.tab : "moves" };
      },
    });
  };

  const closeMoveDialog = (name: string) => {
    router.navigate({
      to: "/pokemon/$name",
      from: "/pokemon/$name/$move",
      params: { name },
      search(prev) {
        return { tab: prev.tab ? prev.tab : "moves" }
      },
    });
  };
  return { changePokemonTab, openMoveDialog, closeMoveDialog };
};
