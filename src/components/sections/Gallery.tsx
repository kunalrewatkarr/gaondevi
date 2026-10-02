import { getGalleryImages } from "@/data/gallery";
import { posterImage } from "@/data/images";
import { GalleryHeading } from "@/components/sections/GalleryHeading";
import { GalleryGrid } from "@/components/ui/GalleryLightbox";
import { FadeIn } from "@/components/ui/FadeIn";

export function Gallery() {
  const images = [
    {
      id: "taklichi-aai",
      src: posterImage,
      category: "utsav" as const,
      altKey: "gallery.alt.poster",
      altIndex: 1,
      altTotal: 1,
    },
    ...getGalleryImages(),
  ];

  return (
    <section id="gallery" className="section-padding bg-night">
      <div className="container-main">
        <GalleryHeading />

        <FadeIn>
          <GalleryGrid images={images} />
        </FadeIn>
      </div>
    </section>
  );
}
