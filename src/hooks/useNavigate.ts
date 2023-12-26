import { router } from "@/routing";

export const internalNavigation = () => {
  const changePokemonTab = (newTab: string, name: string) => {
    router.navigate({
      to: "/pokemon/$name",
      from: "/pokemon/$name",
      hash: newTab,
      params: { name },
    });
  };

  const openMoveDialog = (name: string, move: string) => {
    router.navigate({
      to: "/pokemon/$name/$move",
      from: "/pokemon/$name",
      params: { name, move },
      hash(prev) {
        return prev ?? "";
      },
    });
  };

  const closeMoveDialog = (name: string) => {
    router.navigate({
      to: "/pokemon/$name",
      from: "/pokemon/$name/$move",
      params: { name },
      hash(prev) {
        return prev ?? "";
      },
    });
  };
  return { changePokemonTab, openMoveDialog, closeMoveDialog };
};
