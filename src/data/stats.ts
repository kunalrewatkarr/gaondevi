import { siteConfig } from "./site";

/** Years since स्थापना 1980, anchored to the 2026 festival season (~45+). */
const yearsOfTradition = Math.max(45, 2026 - siteConfig.foundedYear);

export interface Stat {
  /** Final number the counter animates to */
  target: number;
  /** Shown after the number, e.g. "+" */
  suffix?: string;
  label: string;
  /** latin = 46+, devanagari = ४६+ */
  numerals?: "latin" | "devanagari";
}

export const stats: Stat[] = [
  {
    target: yearsOfTradition,
    suffix: "+",
    label: "वर्षांची परंपरा",
    numerals: "latin",
  },
  { target: 9, label: "उत्सवाचे दिवस", numerals: "devanagari" },
  {
    target: 10,
    suffix: "+",
    label: "वार्षिक कार्यक्रम",
    numerals: "latin",
  },
  {
    target: 100,
    suffix: "+",
    label: "स्वयंसेवक / कार्यकर्ते",
    numerals: "latin",
  },
];
