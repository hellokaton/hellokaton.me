import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import { PageBackground } from "@/components/page-background";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dingTalkFont = localFont({
  src: "../fonts/DingTalk_JinBuTi.ttf",
  variable: "--font-dingtalk",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "hellokaton / 全栈开发者",
    template: `%s | hellokaton`,
  },
  description: DATA.description,
  keywords: ["hellokaton", "Full Stack Developer", "React Developer", "Next.js Developer", "TypeScript Developer", "Node.js Developer", "Web Developer India", "Software Engineer"],
  authors: [{ name: "hellokaton" }],
  creator: "hellokaton",
  publisher: "hellokaton",
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: "hellokaton / 全栈开发者",
    description: DATA.description,
    url: DATA.url,
    siteName: "hellokaton - Portfolio",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${DATA.url}/portfolio.png`,
        width: 1200,
        height: 630,
        alt: "hellokaton - Full Stack Developer"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hellokaton | Full Stack Developer',
    description: DATA.description,
    images: [`${DATA.url}/portfolio.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/favicons/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/favicons/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicons/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/favicons/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/favicons/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/favicons/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicons/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/favicons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicons/android-icon-192x192.png",
      },
      {
        rel: "manifest",
        url: "/favicons/manifest.json",
      },
    ],
  },
  manifest: "/favicons/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "hellokaton",
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/favicons/ms-icon-144x144.png",
    "msapplication-config": "/favicons/browserconfig.xml",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rybbitSiteId = process.env.PUBLIC_RYBBIT_SITE_ID;
  const rybbitHost = process.env.PUBLIC_RYBBIT_HOST || "https://app.rybbit.io";
  const rybbitScriptSrc = `${rybbitHost}/api/script.js`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative min-h-screen font-sans antialiased",
          fontSans.variable,
          dingTalkFont.variable
        )}
      >
        {/* Rybbit Tracking Script */}
        {rybbitSiteId && (
          <Script
            src={rybbitScriptSrc}
            data-site-id={rybbitSiteId}
            strategy="afterInteractive"
          />
        )}

        {/* Background container */}
        <div className="fixed inset-0 z-[-1]">
          <PageBackground />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-2xl mx-auto py-12 sm:py-24 px-6">
          <JsonLd />
          <ScrollProgress />
          <ThemeProvider attribute="class" defaultTheme="dark">
            <TooltipProvider delayDuration={0}>
              {children}
              <Analytics />
              <Navbar />
            </TooltipProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
