import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      className={cn("container-main py-2", className)}
      aria-hidden="true"
    >
      <div className="section-divider" />
    </div>
  );
}
