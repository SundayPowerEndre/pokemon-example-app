import { QueryClient } from "@tanstack/react-query";
import {
  Router,
  rootRouteWithContext,
} from "@tanstack/react-router";

import { mainRouteTree } from "./router";
import { ErrorComponent } from "@/components/ErrorComponent";
import MainLoader from "@/components/Loader";
import rootRouteComponent from "@/components/RootRouterComponent";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const queryClient = new QueryClient();


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
  defaultPendingComponent: MainLoader,
  defaultErrorComponent: ErrorComponent,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
});
