import Image from "next/image";
import { TROLLFACE_IMAGE } from "@/lib/constants";

interface TrollfaceImageProps {
  size?: number;
  className?: string;
  glow?: boolean;
  priority?: boolean;
  rounded?: "none" | "lg" | "full";
}

const roundedClasses = {
  none: "",
  lg: "rounded-2xl",
  full: "rounded-full",
};

export default function TrollfaceImage({
  size = 120,
  className = "",
  glow = false,
  priority = false,
  rounded = "lg",
}: TrollfaceImageProps) {
  const image = (
    <Image
      src={TROLLFACE_IMAGE}
      alt="Trollface — TrollERC20"
      width={size}
      height={size}
      priority={priority}
      className={`h-auto ${roundedClasses[rounded]} drop-shadow-[0_0_40px_rgba(34,197,94,0.45)] ${className}`}
      style={{ width: size }}
    />
  );

  if (!glow) return image;

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className="absolute rounded-full bg-troll-green/30 blur-[50px] animate-pulse-glow"
        style={{ width: size * 1.3, height: size * 1.3 }}
      />
      <div
        className="absolute rounded-full bg-troll-green/15 blur-[30px]"
        style={{ width: size * 1.1, height: size * 1.1 }}
      />
      <div className="relative z-10">{image}</div>
    </div>
  );
}
