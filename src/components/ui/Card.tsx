import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  lift?: boolean;
  as?: "div" | "article" | "li";
}

export function Card({
  children,
  className,
  lift = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag className={cn("surface-card", lift && "card-lift", className)}>
      {children}
    </Tag>
  );
}
