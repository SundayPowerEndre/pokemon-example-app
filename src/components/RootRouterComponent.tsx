import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
const rootRouteComponent = () => {
  return (
    <>
      <div className="p-2 mt-6 mx-4 flex gap-2 text-center self-center justify-self-center ">
        <Link to="/listPokemons" className="[&.active]:font-bold">
          Home
        </Link>
      </div>
      <main className="flex justify-center items-center min-h-screen text-brand-secondary tracking-wider">
        <Outlet />
        <ReactQueryDevtools buttonPosition="top-right" />
        <TanStackRouterDevtools position="bottom-right" />
      </main>
    </>
  );
};
export default rootRouteComponent;
