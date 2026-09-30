import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Tiro_Devanagari_Marathi } from "next/font/google";
import { logoImage } from "@/data/branding";
import { contactInfo, socialLinks } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";
import { GhatAnnouncementModal } from "@/components/ui/GhatAnnouncementModal";
import "./globals.css";

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
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
  title: "नवयुवक दुर्गा उत्सव मंडळ | नवरात्र उत्सव २०२६ | झिंगाबाई टाकळी",
  description:
    "नवयुवक दुर्गा उत्सव मंडळ, श्री शिवमंदिर मारुती देवस्थान, झिंगाबाई टाकळी, झेंडा चौक, नागपूर — नवरात्र उत्सव २०२६, श्री दुर्गा माता दर्शन, कार्यक्रम आणि सामाजिक उपक्रम. झिंगाबाई टाकळीची आई (गावदेवीचा मान प्राप्त).",
  keywords: [
    "नवयुवक दुर्गा उत्सव मंडळ",
    "नवरात्र उत्सव २०२६",
    "झिंगाबाई टाकळी",
    "झेंडा चौक",
    "नागपूर",
    "दुर्गा माता",
    "Durga Utsav Nagpur",
    "Navratri Nagpur",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: "नवयुवक दुर्गा उत्सव मंडळ | नवरात्र उत्सव २०२६",
    description:
      "श्री शिवमंदिर मारुती देवस्थान, झिंगाबाई टाकळी, झेंडा चौक, नागपूर — नवरात्र उत्सव २०२६, दर्शन, कार्यक्रम आणि सामाजिक उपक्रम.",
    locale: "mr_IN",
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}${logoImage}`,
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
    canonical: siteConfig.url,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              foundingDate: String(siteConfig.foundedYear),
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nagpur",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
                streetAddress: siteConfig.venue,
              },
              telephone: `+91${contactInfo.phone}`,
              sameAs: [
                socialLinks.instagram,
                socialLinks.facebook,
                socialLinks.youtube,
              ].filter(Boolean),
            }),
          }}
        />
      </head>
      <body
        className={`${notoDevanagari.className} min-h-full flex flex-col bg-ivory text-ink`}
      >
        <a href="#main-content" className="skip-link">
          मुख्य मजकुराकडे जा
        </a>
        <div className="grain" aria-hidden="true" />
        {children}
        <Analytics />
        <GhatAnnouncementModal />
      </body>
    </html>
  );
}
