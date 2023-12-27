import { ErrorRouteProps } from "@tanstack/react-router";
import { ErrorComponent as DefaultErrorComponent } from "@tanstack/react-router";
import { Dialog, DialogContent } from "./ui/dialog";

export const ErrorHandlingComponent = ({ error }: ErrorRouteProps) => {
  if (error instanceof Array) {
    return <div>Something went wrong</div>;
  }
  return <DefaultErrorComponent error={error} />;
};

interface Props {
  showInDialog?: boolean;
}
export const ErrorComponent = ({
  showInDialog,
  error,
  info,
}: Props & ErrorRouteProps) => {
  showInDialog ||= true;

  if (!showInDialog) {
    return <ErrorHandlingComponent error={error} info={info} />;
  }
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <ErrorHandlingComponent error={error} info={info} />
      </DialogContent>
    </Dialog>
  );
};
