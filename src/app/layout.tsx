import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Tiro_Devanagari_Marathi } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { SkipLink } from "@/components/ui/SkipLink";
import { logoImage } from "@/data/branding";
import { siteConfig } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = "https://gaondevi.vercel.app";

const siteDescription =
  "Navyuvak Durga Utsav Mandal (नवयुवक दुर्गा उत्सव मंडळ), also written Navyuwak Durga Utsav Mandal, established 1980 at Shri Shiv Mandir Maruti Devasthan, Zingabai Takli, Zenda Chowk, Nagpur. Daily aarti, a nine-day Navratri festival, cultural events, photos and updates for devotees from Gaondevi and Godhani.";

function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Navyuvak Durga Utsav Mandal",
  alternateName: [
    "नवयुवक दुर्गा उत्सव मंडळ",
    "Navyuwak Durga Utsav Mandal",
    "Navuvak Durga Utsav Madal",
  ],
  url: siteUrl,
  foundingDate: "1980",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shri Shiv Mandir Maruti Devasthan, Zingabai Takli, Zenda Chowk",
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: ["Gaondevi", "Zingabai Takli", "Godhani", "Nagpur"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Navyuvak Durga Utsav Mandal",
  alternateName: ["Navyuwak Durga Utsav Mandal"],
  url: siteUrl,
};

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const tiro = Tiro_Devanagari_Marathi({
  variable: "--font-tiro",
  subsets: ["devanagari"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf3e7",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Navyuvak Durga Utsav Mandal | Gaondevi, Zingabai Takli, Nagpur",
    template: "%s | Navyuvak Durga Utsav Mandal",
  },
  description: siteDescription,
  keywords: [
    "Navyuvak Durga Utsav Mandal",
    "Navyuwak Durga Utsav Mandal",
    "Navuvak Durga Utsav Madal",
    "नवयुवक दुर्गा उत्सव मंडळ",
    "Gaondevi Nagpur",
    "Zingabai Takli Nagpur",
    "Godhani Nagpur",
    "Shri Shiv Mandir Maruti Devasthan Nagpur",
    "झिंगाबाई टाकळी",
    "गोधनी",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: "Navyuvak Durga Utsav Mandal",
    description: siteDescription,
    locale: "mr_IN",
    type: "website",
    siteName: "Navyuvak Durga Utsav Mandal",
    url: siteUrl,
    images: [
      {
        url: logoImage,
        width: 512,
        height: 512,
        alt: "Navyuvak Durga Utsav Mandal, Zingabai Takli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navyuvak Durga Utsav Mandal",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: logoImage, type: "image/png", sizes: "640x640" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="mr"
      className={`${notoDevanagari.variable} ${tiro.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='gaondevi-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        {/* TODO: Confirm official Instagram and YouTube URLs, then add Organization.sameAs. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${notoDevanagari.className} min-h-full flex flex-col bg-ivory text-ink`}
      >
        <LanguageProvider>
          <SkipLink />
          <div className="grain" aria-hidden="true" />
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
