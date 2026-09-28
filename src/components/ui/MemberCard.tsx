import Image from "next/image";
import type { CommitteeMember } from "@/data/committee";

interface MemberCardProps {
  member: CommitteeMember;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="group flex h-full flex-col items-center rounded-3xl bg-card px-3 py-4 text-center shadow-sm shadow-ink/8 ring-1 ring-gold/25 sm:px-4 sm:py-5">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-paper ring-4 ring-gold shadow-[0_0_0_6px_rgba(201,150,44,0.2)] sm:h-28 sm:w-28">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(max-width: 640px) 40vw, 180px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-wine to-maroon px-2 text-center">
            <span className="font-display text-[0.7rem] leading-tight text-cream sm:text-xs">
              {member.name}
            </span>
          </div>
        )}
      </div>
      <h3 className="mt-3 font-display text-sm leading-[1.35] text-ink sm:text-lg sm:leading-snug">
        {member.name}
      </h3>
      <p className="mt-1 text-[0.7rem] font-semibold leading-snug text-gold-ink sm:text-sm">
        {member.role}
      </p>
    </article>
  );
}
