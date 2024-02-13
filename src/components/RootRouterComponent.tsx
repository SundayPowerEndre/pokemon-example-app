import { Link, Outlet } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { env } from "@/env";
const rootRouteComponent = () => {
  return (
    <>
      <div className="mx-4 mt-6 flex gap-4 p-2 text-center">
        <Link
          to="/listPokemons"
          className="text-brand-secondary-light drop-shadow-md [&.active]:font-bold [&.active]:text-brand-secondary"
        >
          <HomeIcon className=" h-10 w-10 sm:h-12 sm:w-12" />
        </Link>
      </div>
      <main className="flex flex-1 justify-center text-brand-secondary-lightest">
        <Outlet />
        {env.VITE_ENV === "development" && (
          <>
            <ReactQueryDevtools
              buttonPosition="top-right"
              initialIsOpen={false}
            />
            <TanStackRouterDevtools position="bottom-right" />
          </>
        )}
      </main>
    </>
  );
};
export default rootRouteComponent;
