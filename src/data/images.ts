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
    "/images/durga/main.jpeg"
  ),
  main: resolveFirstExisting(
    ["/images/durga/main", "/images/durga/durgamaa"],
    "/images/durga/main.jpeg"
  ),
  secondary: resolveFirstExisting(
    ["/images/durga/durgamaa", "/images/durga/secondary", "/images/durga/main"],
    "/images/durga/durgamaa.jpg"
  ),
};

export const mandapImages = {
  primary: resolveFirstExisting(
    ["/images/gallery/mandap/whatsapp-mandap-new", "/images/mandap/mandap", "/images/gallery/mandap/mandap"],
    "/images/gallery/mandap/whatsapp-mandap-new.jpeg"
  ),
  secondary: resolveFirstExisting(
    ["/images/gallery/mandap/mandap", "/images/mandap/mandap"],
    "/images/gallery/mandap/mandap.jpg"
  ),
  tertiary: resolveFirstExisting(
    ["/images/gallery/utsav/utsav3", "/images/gallery/utsav/utsav2", "/images/gallery/sanskriti/sanskriti"],
    "/images/gallery/utsav/utsav3.jpeg"
  ),
  quaternary: resolveFirstExisting(
    ["/images/gallery/karyakarte/whatsapp-karyakarte-1", "/images/gallery/karyakarte/karyakarte"],
    "/images/gallery/karyakarte/whatsapp-karyakarte-1.jpeg"
  ),
};

/** Official mandal poster — झिंगाबाई टाकळीची आई */
export const posterImage = "/images/branding/taklichi-aai.png";

/** घटस्थापना / अखंड मनोकामना ज्योत */
export const jyotImages = {
  main: resolveFirstExisting(
    ["/images/jyot/ghat", "/images/jyot/akhand-jyot", "/images/jyot/main"],
    "/images/jyot/ghat.jpeg"
  ),
};
