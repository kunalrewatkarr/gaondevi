import Image from "next/image";
import { logoImage } from "@/data/branding";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { box: "h-12 w-12", img: 48, ring: "ring-2" },
  md: { box: "h-16 w-16", img: 64, ring: "ring-2" },
  lg: { box: "h-28 w-28", img: 112, ring: "ring-[3px]" },
  xl: { box: "h-36 w-36", img: 144, ring: "ring-[3px]" },
} as const;

interface LogoProps {
  size?: keyof typeof sizes;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
  /** Light ring for dark backgrounds (hero), dark ring for light backgrounds */
  variant?: "light" | "dark";
}

export function Logo({
  size = "sm",
  showLabel = false,
  className,
  labelClassName,
  variant = "light",
}: LogoProps) {
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full bg-cream shadow-lg transition-transform duration-300",
          s.box,
          s.ring,
          variant === "light"
            ? "ring-gold/40 shadow-night/25"
            : "ring-vermillion/20 shadow-ink/10"
        )}
      >
        <Image
          src={logoImage}
          alt={`${siteConfig.name} — अधिकृत लोगो`}
          width={s.img}
          height={s.img}
          className="h-full w-full object-cover [image-rendering:-webkit-optimize-contrast]"
          priority={size === "sm" || size === "md"}
          sizes={`${s.img}px`}
        />
      </div>

      {showLabel && (
        <div className={labelClassName}>
          <p className="font-display text-base leading-tight md:text-lg">
            {siteConfig.name}
          </p>
          <p className="text-xs text-vermillion">{siteConfig.location}</p>
        </div>
      )}
    </div>
  );
}
