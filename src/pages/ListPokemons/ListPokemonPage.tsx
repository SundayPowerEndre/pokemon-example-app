import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { getAllPokemonOptions } from "@/hooks/usePokemon";
import ListItem from "./ListItem";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { mightBePokemon, fetchPokemon } from "@/lib/utils";
import clsx from "clsx";

export const ListPokemon = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(getAllPokemonOptions);

  const [searchBarText, setSearchBarText] = useState<string>("");

  const {
    data: localData,
    fetchNextPage: localFetchNextPage,
    hasNextPage: localHasNextPage,
    isFetchingNextPage: isFetchingNextLocalPage,
  } = useInfiniteQuery({
    queryKey: ["localPokemon", searchBarText],
    queryFn: fetchPokemon,
    getNextPageParam: (lastPage: Awaited<ReturnType<typeof fetchPokemon>>) =>
      lastPage.nextPage,
    initialPageParam: 0,
  });

  const hasActiveText = searchBarText.length > 0;

  const handleScroll = async (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const currentPos = scrollHeight - scrollTop;
    const bottom = clientHeight;
    const isNearBottom = currentPos < bottom + 100;
    if (isNearBottom) {
      if (hasActiveText) {
        if (localHasNextPage) {
          await localFetchNextPage();
        }
        return;
      }
      if (hasNextPage) {
        await fetchNextPage();
      }
    }
  };

  const local_pokemon =
    localData?.pages?.flatMap((pageData) => {
      return pageData.results.filter((item) =>
        mightBePokemon(item.name, searchBarText),
      );
    }) ?? [];

  return (
    <section className="flex min-h-[calc(90dvh)] w-5/6 flex-col justify-end pt-6 sm:min-h-[90vh] sm:w-3/4 sm:justify-between sm:pt-0 md:w-4/6 lg:w-3/5 ">
      <article
        className={clsx(
          "mb-4 grid max-h-[calc(80dvh)] min-h-[calc(80dvh)] grid-flow-row auto-rows-max grid-cols-2 gap-4 overflow-y-scroll sm:mb-0 sm:max-h-[calc(100vh-184px)] sm:content-stretch md:grid-cols-3 lg:grid-cols-4",
          (local_pokemon?.length <= 12) &&
            "content-end",
        )}
        onScroll={handleScroll}
      >
        {hasActiveText &&
          local_pokemon.map((item) => <ListItem item={item} key={item.url} />)}
        {!hasActiveText &&
          data?.pages
            .flatMap((pageData) => pageData.results)
            ?.map((item) => <ListItem item={item} key={item.url} />)}
        {(isFetchingNextPage || isFetchingNextLocalPage) && (
          <div className="my-6">Loading more...</div>
        )}
      </article>
      <div className="sticky pb-[5dvh] sm:pb-11">
        <SearchBar
          fullWidth
          value={searchBarText}
          setValue={setSearchBarText}
          setActive={() => {
            null;
          }}
        />
      </div>
    </section>
  );
};
