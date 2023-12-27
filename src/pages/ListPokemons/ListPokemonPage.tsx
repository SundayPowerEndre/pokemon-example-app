import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getAllPokemonOptions } from "@/hooks/usePokemon";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { mightBePokemon } from "@/lib/utils";

export const ListPokemon = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(getAllPokemonOptions);

  const [searchBarText, setSearchBarText] = useState("");
  const filteredPokemon = data?.pages.flatMap((pageData) =>
    pageData.results.filter((item) => mightBePokemon(item.name, searchBarText)),
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleScroll = (_: unknown) => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const currentPos = scrollHeight - scrollTop;
      const bottom = clientHeight;
      const isNearBottom = currentPos < bottom + 100;
      if (isNearBottom) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col">
      <SearchBar
        fullWidth
        value={searchBarText}
        setValue={setSearchBarText}
        setActive={() => {}}
      />
      <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 self-start pt-[10%]">
        {filteredPokemon?.map((item) => (
          <ListItem item={item} key={item.url} />
        ))}
        {isFetchingNextPage && <div className=" my-6">Loading more...</div>}
      </article>
    </div>
  );
};
