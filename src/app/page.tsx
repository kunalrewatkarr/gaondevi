import { committeeMembers } from "@/data/committee";
import { durgaImages, jyotImages, mandapImages } from "@/data/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { DurgaMaa } from "@/components/sections/DurgaMaa";
import { Events } from "@/components/sections/Events";
import { FestivalExperience } from "@/components/sections/FestivalExperience";
import { Committee } from "@/components/sections/Committee";
import { SocialWork } from "@/components/sections/SocialWork";
import { Stats } from "@/components/sections/Stats";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Donation } from "@/components/sections/Donation";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="relative z-10" tabIndex={-1}>
        <Hero heroSrc={durgaImages.hero} portraitSrc={durgaImages.main} />
        <MarqueeBanner />
        <About imageSrc={durgaImages.main} jyotSrc={jyotImages.main} />
        <Committee members={committeeMembers} />
        <SectionDivider />
        <DurgaMaa imageSrc={durgaImages.secondary} />
        <Events />
        <FestivalExperience images={mandapImages} />
        <Stats />
        <SocialWork />
        <Gallery />
        <Contact />
        <Donation />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFab />
    </>
  );
}
