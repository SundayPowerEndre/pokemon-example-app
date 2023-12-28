import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
const rootRouteComponent = () => {
  return (
    <>
      <div className="mx-4 mt-6 flex gap-4 self-center justify-self-center p-2 text-center ">
        <Link
          to="/listPokemons"
          className="text-brand-secondary-light drop-shadow-md [&.active]:font-bold [&.active]:text-brand-secondary"
        >
          Home
        </Link>
        <Link
          to="/pokemon/$name"
          search={{ tab: "info" }}
          params={{ name: "bulbasaur" }}
          className="text-brand-secondary-light drop-shadow-md [&.active]:font-bold [&.active]:text-brand-secondary"
        >
          Bulbasaur
        </Link>
      </div>
      <main className="flex min-h-screen justify-center tracking-wider text-brand-secondary-lightest">
        <Outlet />
        <ReactQueryDevtools buttonPosition="top-right" />
        <TanStackRouterDevtools position="bottom-right" />
      </main>
    </>
  );
};
export default rootRouteComponent;
