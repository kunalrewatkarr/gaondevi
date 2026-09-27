import { getGalleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/ui/GalleryLightbox";
import { FadeIn } from "@/components/ui/FadeIn";

export function Gallery() {
  const images = getGalleryImages();

  return (
    <section id="gallery" className="section-padding bg-night">
      <div className="container-main">
        <SectionHeading
          kicker="क्षणचित्र"
          title="फोटो गॅलरी"
          subtitle="नवरात्र उत्सव, दर्शन आणि सांस्कृतिक कार्यक्रमांचे क्षण"
          tone="dark"
        />

        <FadeIn>
          <GalleryGrid images={images} />
        </FadeIn>
      </div>
    </section>
  );
}
