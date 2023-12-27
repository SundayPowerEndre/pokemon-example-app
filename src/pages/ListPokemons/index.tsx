import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getAllPokemonOptions } from "@/hooks/usePokemon";
import ListItem from "./ListItem";
import { useEffect } from "react";
import React from "react";

function ListPokemon() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, } =
    useSuspenseInfiniteQuery(getAllPokemonOptions);

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    { rootMargin: "100px" }
  );

  useEffect(() => {
    if (data?.pages.length) {
      const lastElement = document.querySelector(
        "#pokemon-list > div:last-child"
      );
      if (lastElement) {
        observer.observe(lastElement);
      }
    }
    return () => observer.disconnect();
  }, [data, observer]);

  return (
    <article
      id="pokemon-list"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 self-start pt-[10%]"
    >
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.results.map((item) => (
            <ListItem item={item} key={item.url} />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <div>Loading more...</div>}
    </article>
  );
}

export default ListPokemon;
