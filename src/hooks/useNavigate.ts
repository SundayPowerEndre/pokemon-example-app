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
  return { changePokemonTab };
};
