import Image from "next/image";
import type { CommitteeMember } from "@/data/committee";

interface MemberCardProps {
  member: CommitteeMember;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-card shadow-md shadow-ink/10 ring-1 ring-ink/8">
        <Image
          src={member.image}
          alt={`${member.name} — ${member.role}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/75 to-transparent p-2.5 pt-12 sm:p-4 sm:pt-16">
          <h3 className="font-display text-sm leading-[1.35] text-cream sm:text-lg sm:leading-snug">
            {member.name}
          </h3>
          <p className="mt-0.5 text-[0.7rem] leading-snug text-gold sm:text-sm">
            {member.role}
          </p>
        </div>
      </div>
    </article>
  );
}
