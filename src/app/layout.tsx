import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Tiro_Devanagari_Marathi } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { SkipLink } from "@/components/ui/SkipLink";
import { logoImage } from "@/data/branding";
import { siteConfig } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = "https://gaondevi.vercel.app";

const siteTitle = "नवयुवक दुर्गा उत्सव मंडळ | झिंगाबाई टाकळी";

const siteDescription =
  "नवयुवक दुर्गा उत्सव मंडळ, श्री शिवमंदिर मारुती देवस्थान, झिंगाबाई टाकळी, झेंडा चौक, नागपूर — नवरात्र उत्सव २०२६, श्री दुर्गा माता दर्शन, कार्यक्रम आणि सामाजिक उपक्रम. झिंगाबाई टाकळीची आई (गावदेवीचा मान प्राप्त).";

function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "नवयुवक दुर्गा उत्सव मंडळ",
  alternateName: [
    "Navyuvak Durga Utsav Mandal",
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
  name: "नवयुवक दुर्गा उत्सव मंडळ",
  alternateName: ["Navyuvak Durga Utsav Mandal", "Navyuwak Durga Utsav Mandal"],
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
    default: siteTitle,
    template: "%s | नवयुवक दुर्गा उत्सव मंडळ",
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
    title: "नवयुवक दुर्गा उत्सव मंडळ | नवरात्र उत्सव २०२६",
    description:
      "श्री शिवमंदिर मारुती देवस्थान, झिंगाबाई टाकळी, झेंडा चौक, नागपूर — नवरात्र उत्सव २०२६, दर्शन, कार्यक्रम आणि सामाजिक उपक्रम.",
    locale: "mr_IN",
    type: "website",
    siteName: siteConfig.name,
    url: siteUrl,
    images: [
      {
        url: logoImage,
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "नवयुवक दुर्गा उत्सव मंडळ | नवरात्र उत्सव २०२६",
    description:
      "श्री शिवमंदिर मारुती देवस्थान, झिंगाबाई टाकळी, झेंडा चौक, नागपूर येथे भव्य नवरात्र उत्सव २०२६.",
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
