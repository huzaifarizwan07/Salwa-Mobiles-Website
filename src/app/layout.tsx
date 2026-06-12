import type { Metadata } from "next";
import { Archivo_Black, Montserrat } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SALWA MOBILES - Future-Proof Your Grip",
  description: "At SALWA MOBILES, we don't just sell devices; we curate the tech that defines your lifestyle. Premium mobile hardware, elite accessories, and a yellow-standard of service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} ${montserrat.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
