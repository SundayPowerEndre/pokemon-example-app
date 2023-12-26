import { ErrorRouteProps } from "@tanstack/react-router";
import { ErrorComponent as DefaultErrorComponent } from "@tanstack/react-router";
export const ErrorComponent = ({ error }: ErrorRouteProps) => {
  if (error instanceof Array) {
    return <div>Something went wrong</div>;
  }
  return <DefaultErrorComponent error={error} />;
};
