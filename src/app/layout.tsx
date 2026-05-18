import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { StoreHydrator } from "@/components/StoreHydrator";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "monis.rent — Design your workspace in Bali",
  description:
    "Build your ideal remote workspace and rent it by the day. Furniture and accessories for digital nomads and startups in Bali.",
  openGraph: {
    title: "monis.rent — Design your workspace in Bali",
    description:
      "Build your ideal remote workspace and rent it by the day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full grain" suppressHydrationWarning>
        <StoreHydrator />
        {children}
      </body>
    </html>
  );
}
