import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getAllPokemonOptions } from "@/hooks/usePokemon";
import ListItem from "./ListItem";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { mightBePokemon } from "@/lib/utils";

export const ListPokemon = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(getAllPokemonOptions);

  const [searchBarText, setSearchBarText] = useState("");
  const filteredPokemon = data?.pages.flatMap((pageData) =>
    pageData.results.filter((item) => mightBePokemon(item.name, searchBarText)),
  );

  const handleScroll = async (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const currentPos = scrollHeight - scrollTop;
    const bottom = clientHeight;
    const isNearBottom = currentPos < bottom + 100;
    if (isNearBottom) {
      if (hasNextPage) {
        await fetchNextPage();
      }
    }
  };

  return (
    <div className="flex min-h-[90vh] flex-col justify-between">
      <article
        className="grid max-h-[calc(100dvh-250px)] lg:max-h-[calc(100dvh-184px)] min-h-6 grid-cols-2 gap-4 self-start overflow-auto md:grid-cols-3 lg:grid-cols-4 "
        onScroll={handleScroll}
      >
        {filteredPokemon?.map((item) => (
          <ListItem item={item} key={item.url} />
        ))}
        {isFetchingNextPage && <div className=" my-6">Loading more...</div>}
      </article>
      <div className="sticky bottom-11 ">
        <SearchBar
          fullWidth
          value={searchBarText}
          setValue={setSearchBarText}
          setActive={() => {
            null;
          }}
        />
      </div>
    </div>
  );
};
