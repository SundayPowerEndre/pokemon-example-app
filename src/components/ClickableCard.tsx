import { useIsOverflow } from "@/hooks/useOverflow";
import { useState, useRef } from "react";
import Marquee from "react-fast-marquee";

const ClickableCard = ({ onClick, children }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const isOverflowing = useIsOverflow(divRef);

  const shouldShowMarquee = isActive && isOverflowing;
  const marqueeText = children.padEnd(50, "\u00A0")

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      className="rounded-md  border border-brand-secondary p-4 drop-shadow-lg "
    >
      {!shouldShowMarquee && (
        <div
          ref={divRef}
          className="h-7 overflow-hidden  text-ellipsis whitespace-nowrap bg-transparent text-center text-lg "
        >
          {children}
        </div>
      )}
      {shouldShowMarquee && (
        <Marquee className="h-7 text-lg ">
          <p>{marqueeText}</p>
        </Marquee>
      )}
    </button>
  );
};

interface Props {
  onClick: () => void;
  children: string;
}

export default ClickableCard;
