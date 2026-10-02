import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { IMAGE_EXTENSIONS, listPublicImages } from "@/lib/media";

export type GalleryCategory =
  | "darshan"
  | "utsav"
  | "sanskriti"
  | "mandap"
  | "karyakarte"
  | "samaj";

export interface GalleryImage {
  id: string;
  src: string;
  category: GalleryCategory;
  /** Overrides gallery.alt.{category} when set */
  altKey?: string;
  altIndex: number;
  altTotal: number;
}

export const galleryCategories: GalleryCategory[] = [
  "darshan",
  "utsav",
  "sanskriti",
  "mandap",
  "karyakarte",
  "samaj",
];

/** Folder name under public/images/gallery/ → category */
export const galleryFolderMap: Record<string, GalleryCategory> = {
  darshan: "darshan",
  utsav: "utsav",
  sanskriti: "sanskriti",
  mandap: "mandap",
  karyakarte: "karyakarte",
  samaj: "samaj",
};

const GALLERY_ROOT = join(process.cwd(), "public/images/gallery");

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
        altIndex: index + 1,
        altTotal: files.length,
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
      category: "utsav" as const,
      altIndex: index + 1,
      altTotal: loose.length,
    }));
}
