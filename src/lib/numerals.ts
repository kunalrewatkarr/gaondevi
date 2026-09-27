const DEVANAGARI = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"] as const;

export function formatStatNumber(
  value: number,
  numerals: "latin" | "devanagari" = "devanagari"
): string {
  const str = String(Math.round(value));
  if (numerals === "latin") return str;
  return str.replace(/\d/g, (d) => DEVANAGARI[Number(d)]);
}
