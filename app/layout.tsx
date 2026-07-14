import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jacky-finance-dashboard.jackyyuqi.chatgpt.site"),
  title: "Jacky 財務島｜個人財務決策儀表板",
  description: "整合現金流、緊急預備金、投資、信貸、保單與數位事業的個人財務決策儀表板。",
  openGraph: {
    title: "Jacky 財務島",
    description: "先守住安全墊，再讓資產長大。",
    images: [{ url: "/og.png", width: 1536, height: 864, alt: "Jacky 財務島" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacky 財務島",
    description: "先守住安全墊，再讓資產長大。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
