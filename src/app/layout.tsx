import type { Metadata, Viewport } from "next";
import { generateViewport as baseGenerateViewport, getPageMetadata } from "@/lib/metadata-seo";
import { Geist, Geist_Mono, Architects_Daughter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const handwriting = Architects_Daughter({
  variable: "--font-handwriting",
  weight: "400",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home");
}

export async function generateViewport(): Promise<Viewport> {
  return baseGenerateViewport();
}

import { ThemeProvider } from "@/context/ThemeContext";

import CommandPalette from "@/components/CommandPalette";
import Preloader from "@/components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${handwriting.variable}`}>
      <body className="antialiased selection:bg-[#ff4d00] selection:text-white">
        <Preloader />
        <div className="crt-overlay" />
        <CommandPalette />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
