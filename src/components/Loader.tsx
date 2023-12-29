import { cn } from "@/lib/utils";
import { Dialog } from "./ui/dialog";

const MainLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-screen flex-col items-center justify-center",
        className,
      )}
    >
      <img
        src="/pikachu-loading.gif"
        alt="Pikachu having fun"
        className={"transition-opacity duration-500"}
      />
    </div>
  );
};

interface Props {
  showInDialog?: boolean;
}
const PokemonLoader = ({ showInDialog }: Props) => {
  showInDialog ||= false;

  if (!showInDialog) {
    return <MainLoader />;
  }
  return (
    <Dialog open>
      <article className="fixed left-[50%] top-[50%] z-50 grid h-fit w-fit translate-x-[-50%] translate-y-[-50%] gap-4  bg-transparent p-6 shadow-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <MainLoader className={"h-fit"} />
      </article>
    </Dialog>
  );
};

export default PokemonLoader;
