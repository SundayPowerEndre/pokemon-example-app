import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Link,
  Outlet,
  Router,
  rootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { mainRouteTree } from "./router";
import { ErrorComponent } from "@/components/ErrorComponent";
import PokeballLoader from "@/components/Loader";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const queryClient = new QueryClient();

const rootRouteComponent = () => {
  return (
    <>
      <div className="p-2 mt-6 mx-4 flex gap-2 text-center self-center justify-self-center ">
        <Link to="/listPokemons" className="[&.active]:font-bold">
          Home
        </Link>
      </div>
      <main className="flex justify-center items-center min-h-screen">
        <Outlet />
        <ReactQueryDevtools buttonPosition="top-right" />
        <TanStackRouterDevtools position="bottom-right" />
      </main>
    </>
  );
};

export const rootRoute = rootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: rootRouteComponent,
});

const routeTree = rootRoute.addChildren([...mainRouteTree]);

// Set up a Router instance
export const router = new Router({
  routeTree,
  defaultPreload: "intent",
  defaultPendingComponent: PokeballLoader,
  defaultErrorComponent: ErrorComponent,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
});
