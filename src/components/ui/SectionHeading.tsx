import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  tone?: "light" | "dark";
  kicker?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  tone = "light",
  kicker,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn(centered && "text-center", "mb-10 sm:mb-12 md:mb-16", className)}>
      {kicker && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.28em]",
            isDark ? "text-saffron" : "text-vermillion"
          )}
        >
          {kicker}
        </p>
      )}
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          centered && "justify-center"
        )}
      >
        <span
          className={cn(
            "h-px w-10",
            isDark ? "bg-saffron/60" : "bg-vermillion/50"
          )}
          aria-hidden="true"
        />
        <span className={cn("text-xl", isDark ? "text-saffron" : "text-vermillion")} aria-hidden="true">
          ✦
        </span>
        <span
          className={cn(
            "h-px w-10",
            isDark ? "bg-saffron/60" : "bg-vermillion/50"
          )}
          aria-hidden="true"
        />
      </div>
      <h2
        className={cn(
          "font-display text-[1.75rem] leading-[1.35] tracking-tight sm:text-4xl sm:leading-snug md:text-5xl lg:text-[3.25rem]",
          isDark ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl",
            centered && "mx-auto",
            isDark ? "text-cream/70" : "text-ink-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
