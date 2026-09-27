import { resolveFirstExisting } from "@/lib/media";

/**
 * Durga murti photos — drop replacements with the same file stem:
 *   public/images/durga/main.*      → about + hero portrait
 *   public/images/durga/durgamaa.*  → श्री दुर्गामाता circular section
 * Hero uses the wide utsav photograph when a dedicated hero file is absent.
 */
export const durgaImages = {
  hero: resolveFirstExisting(
    ["/images/durga/main", "/images/durga/durgamaa"],
    "/images/durga/main.jpg"
  ),
  main: resolveFirstExisting(
    ["/images/durga/main", "/images/durga/durgamaa"],
    "/images/durga/main.jpg"
  ),
  secondary: resolveFirstExisting(
    ["/images/durga/durgamaa", "/images/durga/secondary", "/images/durga/main"],
    "/images/durga/durgamaa.jpg"
  ),
};

export const mandapImages = {
  primary: resolveFirstExisting(
    ["/images/mandap/mandap", "/images/gallery/mandap/mandap"],
    "/images/mandap/mandap.jpg"
  ),
  secondary: resolveFirstExisting(
    ["/images/gallery/mandap/mandap2", "/images/mandap/mandap"],
    "/images/gallery/mandap/mandap2.jpg"
  ),
  tertiary: resolveFirstExisting(
    [
      "/images/gallery/utsav/utsav2",
      "/images/gallery/sanskriti/sanskriti",
      "/images/gallery/mandap/mandap",
    ],
    "/images/gallery/utsav/utsav2.jpg"
  ),
};

/** घटस्थापना / अखंड मनोकामना ज्योत */
export const jyotImages = {
  main: resolveFirstExisting(
    ["/images/jyot/ghat", "/images/jyot/akhand-jyot", "/images/jyot/main"],
    "/images/jyot/ghat.jpg"
  ),
};
