import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public");
export const IMAGE_EXTENSIONS = [".webp", ".avif", ".jpg", ".jpeg", ".png", ".svg"] as const;

function hasImageExt(name: string): boolean {
  return IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext));
}

/** Strip leading slash so join(public, path) works correctly */
function toPublicRelative(stem: string): string {
  return stem.startsWith("/") ? stem.slice(1) : stem;
}

/** Prefer real photos (webp/jpg/png) over placeholder SVGs */
export function resolvePublicImage(stem: string, fallback: string): string {
  const base = toPublicRelative(stem);

  for (const ext of IMAGE_EXTENSIONS) {
    const rel = `${base}${ext}`;
    if (existsSync(join(PUBLIC_DIR, rel))) {
      return `/${rel}`;
    }
  }

  return fallback;
}

export function resolveFirstExisting(stems: string[], fallback: string): string {
  for (const stem of stems) {
    const found = resolvePublicImage(stem, "");
    if (found) return found;
  }
  return fallback;
}

export function listPublicImages(relativeDir: string): string[] {
  const dir = join(PUBLIC_DIR, toPublicRelative(relativeDir));
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((name) => {
      if (name.startsWith(".")) return false;
      const full = join(dir, name);
      return statSync(full).isFile() && hasImageExt(name);
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => `/${toPublicRelative(relativeDir)}/${name}`);
}
