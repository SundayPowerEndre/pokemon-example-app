import { Link, Outlet } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";
const rootRouteComponent = () => {
  return (
    <>
      <div className="mx-4 mt-6 flex gap-4 p-2 text-center ">
        <Link
          to="/listPokemons"
          className="text-brand-secondary-light drop-shadow-md [&.active]:font-bold [&.active]:text-brand-secondary"
        >
          <HomeIcon className=" sm:h-8 sm:w-8 lg:h-12 lg:w-12" />
        </Link>
      </div>
      <main className="flex flex-1 justify-center tracking-wider text-brand-secondary-lightest">
        <Outlet />
      </main>
    </>
  );
};
export default rootRouteComponent;
