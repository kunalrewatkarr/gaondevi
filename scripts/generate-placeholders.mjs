import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const publicDir = join(process.cwd(), "public", "images");

function svgPortrait(id, title, hue) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(${hue},55%,18%)"/>
      <stop offset="55%" style="stop-color:hsl(${hue},62%,28%)"/>
      <stop offset="100%" style="stop-color:hsl(${Math.min(hue + 25, 40)},70%,38%)"/>
    </linearGradient>
    <radialGradient id="glow${id}" cx="50%" cy="38%" r="48%">
      <stop offset="0%" style="stop-color:#f4d58d;stop-opacity:0.55"/>
      <stop offset="100%" style="stop-color:#f4d58d;stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="900" height="1200" fill="url(#bg${id})"/>
  <circle cx="450" cy="420" r="320" fill="url(#glow${id})"/>
  <path d="M450 220 L485 340 L615 340 L510 420 L545 540 L450 460 L355 540 L390 420 L285 340 L415 340 Z" fill="#f4d58d" opacity="0.55"/>
  <ellipse cx="450" cy="620" rx="95" ry="120" fill="#fff6ea" opacity="0.18"/>
  <text x="450" y="880" text-anchor="middle" fill="#fff6ea" font-family="Georgia, serif" font-size="32">${title}</text>
  <text x="450" y="930" text-anchor="middle" fill="#f4d58d" font-family="Georgia, serif" font-size="18" opacity="0.75">Placeholder — drop a real photo here</text>
</svg>`;
}

function svgWide(id, title, hue) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="w${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(${hue},50%,22%)"/>
      <stop offset="100%" style="stop-color:hsl(${hue},45%,12%)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#w${id})"/>
  <rect x="48" y="48" width="1104" height="704" rx="24" fill="none" stroke="#f4d58d" stroke-width="2" opacity="0.28"/>
  <circle cx="600" cy="360" r="90" fill="#f4d58d" opacity="0.22"/>
  <text x="600" y="680" text-anchor="middle" fill="#fff6ea" font-family="Georgia, serif" font-size="28">${title}</text>
</svg>`;
}

function svgMember(id) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800" role="img" aria-label="सदस्य ${id}">
  <defs>
    <linearGradient id="m${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#6b1c1c"/>
      <stop offset="100%" style="stop-color:#2a0b0b"/>
    </linearGradient>
  </defs>
  <rect width="640" height="800" fill="url(#m${id})"/>
  <circle cx="320" cy="280" r="110" fill="#f4d58d" opacity="0.28"/>
  <circle cx="320" cy="260" r="86" fill="#fff6ea" opacity="0.16"/>
  <ellipse cx="320" cy="560" rx="150" ry="140" fill="#fff6ea" opacity="0.1"/>
  <text x="320" y="740" text-anchor="middle" fill="#f4d58d" font-family="Georgia, serif" font-size="22">सदस्य ${id}</text>
</svg>`;
}

const dirs = [
  "durga",
  "committee",
  "mandap",
  "gallery/darshan",
  "gallery/utsav",
  "gallery/sanskriti",
  "gallery/mandap",
  "gallery/karyakarte",
  "gallery/samaj",
];
dirs.forEach((d) => mkdirSync(join(publicDir, d), { recursive: true }));

writeFileSync(join(publicDir, "durga", "hero.svg"), svgPortrait("h", "श्री दुर्गा माता", 8));
writeFileSync(join(publicDir, "durga", "main.svg"), svgPortrait("m", "नवरात्र उत्सव", 14));
writeFileSync(join(publicDir, "durga", "secondary.svg"), svgPortrait("s", "देवी दर्शन", 4));

for (let i = 1; i <= 10; i++) {
  const id = String(i).padStart(2, "0");
  writeFileSync(join(publicDir, "committee", `member-${id}.svg`), svgMember(id));
}

const gallery = {
  darshan: ["देवी दर्शन १", "देवी दर्शन २"],
  utsav: ["उत्सव १", "उत्सव २", "उत्सव ३"],
  sanskriti: ["सांस्कृतिक १", "सांस्कृतिक २"],
  mandap: ["मंडप १", "मंडप २", "मंडप ३"],
  karyakarte: ["कार्यकर्ते १"],
  samaj: ["सामाजिक १"],
};

let hue = 8;
Object.entries(gallery).forEach(([folder, titles]) => {
  titles.forEach((title, i) => {
    writeFileSync(
      join(publicDir, "gallery", folder, `${String(i + 1).padStart(2, "0")}.svg`),
      svgWide(`${folder}${i}`, title, hue)
    );
    hue += 10;
  });
});

writeFileSync(join(publicDir, "mandap", "01.svg"), svgWide("mp1", "मंडप", 12));
writeFileSync(join(publicDir, "mandap", "02.svg"), svgWide("mp2", "प्रकाशयोजना", 22));
writeFileSync(join(publicDir, "mandap", "03.svg"), svgWide("mp3", "सजावट", 32));

console.log("Placeholder images generated in public/images/");
