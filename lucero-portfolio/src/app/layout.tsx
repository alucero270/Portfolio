import type { Metadata } from "next";
import { Bitter, JetBrains_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import { SiteShell } from "@/components/site-shell";
import { ThemeRegistry } from "@/components/theme-registry";
import { siteConfig } from "@/lib/site";

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const bitter = Bitter({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteTitle,
    template: "%s | Alex Lucero",
  },
  description: siteConfig.siteDescription,
  openGraph: {
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${bitter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeRegistry>
          <SiteShell>{children}</SiteShell>
        </ThemeRegistry>
      </body>
    </html>
  );
}
