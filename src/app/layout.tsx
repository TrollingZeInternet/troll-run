import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrollERC20 | troll.run — The Memecoin for Internet Culture",
  description:
    "TrollERC20 ($TROLL) is the memecoin carrying the legacy of the most iconic meme in history. Join the troll army on Ethereum.",
  keywords: ["TROLL", "TrollERC20", "memecoin", "Ethereum", "ERC-20", "trollface", "crypto", "troll.run"],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "TrollERC20 | troll.run",
    description: "The memecoin for internet culture. Pure troll energy on Ethereum.",
    url: "https://troll.run",
    siteName: "TrollERC20",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
