import type { Metadata } from "next";
import { Rajdhani, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FunnelTracker from "@/components/FunnelTracker";
import CookieConsent from "@/components/CookieConsent";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MastLOCK by XF2 — Click In. Ride. Release.",
  description:
    "MastLOCK eliminates the friction between you and the water. No tools, no screws, no wasted time at the spot. Engineered for repeatability and precision.",
  openGraph: {
    title: "MastLOCK by XF2 — Click In. Ride. Release.",
    description:
      "0.4 seconds. One hand. Zero tools. The precision foil mast mounting system for wingfoil, kitefoil, and surf foil.",
    images: ["/images/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MastLOCK by XF2",
    description: "0.4 seconds. One hand. Zero tools.",
    images: ["/images/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${rajdhani.variable} ${inter.variable}`}>
      <body className="bg-canvas text-text-primary font-body antialiased">
        <SmoothScroll />
        <FunnelTracker />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
