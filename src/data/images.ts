import { resolveFirstExisting } from "@/lib/media";

/**
 * Durga murti photos — drop replacements with same names:
 *   public/images/durga/hero.jpg/png → full-bleed hero (mandal + Durga Maa)
 *   public/images/durga/main.png      → about + hero portrait highlight
 *   public/images/durga/secondary.png → श्री दुर्गामाता circular section
 * Original backup: murti-original.png
 */
export const durgaImages = {
  hero: resolveFirstExisting(
    ["/images/durga/hero", "/images/durga/durga-01"],
    "/images/durga/hero.svg"
  ),
  main: resolveFirstExisting(
    ["/images/durga/main", "/images/durga/durga-02"],
    "/images/durga/main.svg"
  ),
  secondary: resolveFirstExisting(
    ["/images/durga/secondary", "/images/durga/durga-03"],
    "/images/durga/secondary.svg"
  ),
};

export const mandapImages = {
  primary: resolveFirstExisting(
    ["/images/mandap/01", "/images/gallery/mandap/01"],
    "/images/gallery/mandap/01.svg"
  ),
  secondary: resolveFirstExisting(
    ["/images/mandap/02", "/images/gallery/mandap/02"],
    "/images/gallery/mandap/02.svg"
  ),
  tertiary: resolveFirstExisting(
    ["/images/mandap/03", "/images/gallery/mandap/03"],
    "/images/gallery/mandap/03.svg"
  ),
};

/** अखंड मनोकामना ज्योत — rows of lit diyas */
export const jyotImages = {
  main: resolveFirstExisting(
    ["/images/jyot/akhand-jyot", "/images/jyot/main"],
    "/images/jyot/akhand-jyot.jpg"
  ),
};
