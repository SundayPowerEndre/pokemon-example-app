import { router } from "@/routing";
import { type PokemonTabOptions } from "@/routing/routeValidation";

export const internalNavigation = () => {
  const changePokemonTab = async (newTab: PokemonTabOptions, name: string) => {
    try {
      await router.navigate({
        to: "/pokemon/$name",
        from: "/pokemon/$name",
        params: { name },
        search: { tab: newTab },
      });
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  const openMoveDialog = async (name: string, move: string) => {
    try {
      await router.navigate({
        to: "/pokemon/$name/$move",
        from: "/pokemon/$name",
        params: { name, move },
        search(prev) {
          return { tab: prev.tab ? prev.tab : "moves" };
        },
      });
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  const closeMoveDialog = async (name: string) => {
    try {
      await router.navigate({
        to: "/pokemon/$name",
        from: "/pokemon/$name/$move",
        params: { name },
        search(prev) {
          return { tab: prev.tab ? prev.tab : "moves" };
        },
      });
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };
  return { changePokemonTab, openMoveDialog, closeMoveDialog };
};
