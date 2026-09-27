import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "outline-light";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}

const variants = {
  primary:
    "btn-shimmer text-on-gold shadow-lg shadow-gold/35 hover:shadow-gold/55 focus-visible:ring-gold",
  secondary:
    "bg-gradient-to-br from-vermillion to-maroon text-cream shadow-lg shadow-maroon/30 hover:brightness-110 focus-visible:ring-vermillion",
  outline:
    "border-2 border-gold-ink bg-transparent text-gold-ink hover:border-maroon hover:bg-maroon hover:text-cream focus-visible:ring-gold",
  "outline-light":
    "border-2 border-gold/80 bg-transparent text-cream hover:border-gold hover:bg-gold/15 focus-visible:ring-gold",
};

const sizes = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-11 px-6 py-3 text-base",
  lg: "min-h-12 px-8 py-4 text-lg",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
