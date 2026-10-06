import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Para Ali — Feliz Cumpleaños",
  description: "Una pequeña colección de nosotros.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${newsreader.variable} ${inter.variable}`}>
      <body className="bg-[#FAF8F5] text-[#1C1917] font-sans antialiased selection:bg-[#EAE2D7] selection:text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}

