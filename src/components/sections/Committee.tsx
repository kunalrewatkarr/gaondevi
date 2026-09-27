import { committeeMembers } from "@/data/committee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MemberCard } from "@/components/ui/MemberCard";
import { FadeIn } from "@/components/ui/FadeIn";

export function Committee() {
  return (
    <section id="committee" className="section-padding section-surface">
      <div className="container-main">
        <SectionHeading
          kicker="मंडळ"
          title="मंडळाची कार्यकारिणी"
          subtitle="मुख्य पदाधिकारी — अध्यक्ष, सचिव, कोषाध्यक्ष व हिशोबनीस"
        />

        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-ink-muted">
          खालील फक्त मुख्य पदाधिकारी आहेत. उत्सवात १००+ स्वयंसेवक व कार्यकर्ते
          सक्रिय सहभागी असतात.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">
          {committeeMembers
            .filter((member) => member.line === "पदाधिकारी")
            .map((member, i) => (
              <FadeIn key={member.id} delay={i * 40}>
                <MemberCard member={member} />
              </FadeIn>
            ))}
        </div>

        <h3 className="mb-6 mt-12 text-center font-display text-2xl text-gold-ink sm:mt-16 sm:text-3xl">
          हिशोबनीस
        </h3>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {committeeMembers
            .filter((member) => member.line === "हिशोबनीस")
            .map((member, i) => (
              <FadeIn key={member.id} delay={i * 40}>
                <MemberCard member={member} />
              </FadeIn>
            ))}
        </div>
      </div>
    </section>
  );
}
