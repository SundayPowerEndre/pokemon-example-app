import { useRef, useEffect } from "react";
import spriteSheet from "/transparent-shiny-animation.png"; // Path to your sprite sheet
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const ShinyAnimation = ({ className }: Props) => {
  const animationRef = useRef<HTMLDivElement | null>(null);
  const frameCount = 29;
  const cols = 6;
  const normalFrameWidth = 90;
  const normalFrameHeight = 76;

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      const row = Math.floor(frame / cols);
      const col = frame % cols;
      const xOffset = col * normalFrameWidth;
      const yOffset = row * normalFrameHeight;

      if (animationRef.current) {
        animationRef.current.style.backgroundPosition = `-${xOffset}px -${yOffset}px`;
        animationRef.current.style.width = `${normalFrameWidth}px`;
        animationRef.current.style.height = `${normalFrameHeight}px`;
      }
      frame++;
      if (frame <= frameCount + 3) {
        setTimeout(animate, 1000 / 60);
      }
      if (frame > frameCount + 3 && animationRef.current) {
        animationRef.current.style.backgroundPosition = `-${0}px -${0}px`;
        animationRef.current.style.width = `${0}px`;
        animationRef.current.style.height = `${0}px`;
      }
    };
    animate();
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={animationRef}
        style={{
          width: `${normalFrameWidth}px`,
          height: `${normalFrameHeight}px`,
          backgroundImage: `url(${spriteSheet})`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

export default ShinyAnimation;
