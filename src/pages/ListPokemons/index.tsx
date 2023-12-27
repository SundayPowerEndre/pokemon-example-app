import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getAllPokemonOptions } from "@/hooks/usePokemon";
import ListItem from "./ListItem";
import { useEffect } from "react";

function ListPokemon() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(getAllPokemonOptions);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleScroll = (_: unknown) => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollHeight - scrollTop === clientHeight) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  return (
    <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 self-start pt-[10%]">
      {data.pages.flatMap((pageData) =>
        pageData.results.map((item) => <ListItem item={item} key={item.url} />),
      )}
      {isFetchingNextPage && <div className=" my-6">Loading more...</div>}
    </article>
  );
}

export default ListPokemon;
