export type GalleryCategory =
  | "navratri2026"
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

/** Filter order. Navratri 2026 stays first once photos exist. */
export const galleryCategories: GalleryCategory[] = [
  "navratri2026",
  "darshan",
  "utsav",
  "sanskriti",
  "mandap",
  "karyakarte",
  "samaj",
];
