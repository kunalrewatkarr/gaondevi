import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { IMAGE_EXTENSIONS, listPublicImages } from "@/lib/media";
import { formatStatNumber } from "@/lib/numerals";

export type GalleryCategory =
  | "देवी दर्शन"
  | "उत्सव"
  | "सांस्कृतिक कार्यक्रम"
  | "मंडप"
  | "कार्यकर्ते"
  | "सामाजिक उपक्रम";

export interface GalleryImage {
  id: string;
  src: string;
  category: GalleryCategory;
  alt: string;
}

export const galleryCategories: GalleryCategory[] = [
  "देवी दर्शन",
  "उत्सव",
  "सांस्कृतिक कार्यक्रम",
  "मंडप",
  "कार्यकर्ते",
  "सामाजिक उपक्रम",
];

/** Folder name under public/images/gallery/ → category */
export const galleryFolderMap: Record<string, GalleryCategory> = {
  darshan: "देवी दर्शन",
  utsav: "उत्सव",
  sanskriti: "सांस्कृतिक कार्यक्रम",
  mandap: "मंडप",
  karyakarte: "कार्यकर्ते",
  samaj: "सामाजिक उपक्रम",
};

const GALLERY_ROOT = join(process.cwd(), "public/images/gallery");

const galleryAltByFolder: Record<string, string> = {
  darshan: "श्री दुर्गा मातेचे दर्शन",
  utsav: "नवरात्र उत्सवाचे दृश्य",
  sanskriti: "सांस्कृतिक कार्यक्रमाचे क्षण",
  mandap: "उत्सवाचा मंडप",
  karyakarte: "मंडळाचे कार्यकर्ते",
  samaj: "सामाजिक उपक्रम",
};

function galleryAlt(folder: string, category: string, index: number, total: number): string {
  const label = galleryAltByFolder[folder] ?? category;
  const count = total > 1 ? ` ${formatStatNumber(index + 1)}` : "";
  return `${label}${count} — नवयुवक दुर्गा उत्सव मंडळ`;
}

function isImageFile(name: string): boolean {
  return IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext));
}

/**
 * Auto-loads every photo in public/images/gallery/{category}/
 * Drop 50–100 files into those folders — no code edits needed.
 */
export function getGalleryImages(): GalleryImage[] {
  const images: GalleryImage[] = [];

  if (!existsSync(GALLERY_ROOT)) return images;

  for (const [folder, category] of Object.entries(galleryFolderMap)) {
    const files = listPublicImages(`images/gallery/${folder}`);
    files.forEach((src, index) => {
      images.push({
        id: `${folder}-${index + 1}`,
        src,
        category,
        alt: galleryAlt(folder, category, index, files.length),
      });
    });
  }

  if (images.length > 0) return images;

  const loose = readdirSync(GALLERY_ROOT).filter((name) => {
    const full = join(GALLERY_ROOT, name);
    return statSync(full).isFile() && isImageFile(name);
  });

  return loose
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name, index) => ({
      id: `loose-${index + 1}`,
      src: `/images/gallery/${name}`,
      category: "उत्सव" as const,
      alt: galleryAlt("utsav", "उत्सव", index, loose.length),
    }));
}
