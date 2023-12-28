import { cn } from "@/lib/utils";
import { Dialog } from "./ui/dialog";

const MainLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex h-screen items-center justify-center", className)}>
      <div className="animate-spin-slow">
        <svg
          className=" h-96 w-96"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="half">
              <rect x="0" y="0" width="100" height="50" />
            </clipPath>
            <linearGradient
              id="grad1"
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF5555" />
              <stop offset="1" stopColor="#FF0000" />
            </linearGradient>
          </defs>

          <circle cx="50" cy="50" r="50" fill="white" />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="url(#grad1)"
            clipPath="url(#half)"
          />
          <path
            d="M50 35c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15z"
            fill="white"
            stroke="black"
            strokeWidth="2.5"
          />
          <circle cx="50" cy="50" r="10" fill="black" />
        </svg>
      </div>
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
      <article className=" fixed left-[50%] top-[50%] z-50 grid h-fit w-fit translate-x-[-50%] translate-y-[-50%] gap-4  bg-transparent p-6 shadow-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <MainLoader className={" h-fit"} />
      </article>
    </Dialog>
  );
};

export default PokemonLoader;
