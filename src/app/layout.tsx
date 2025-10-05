import type { Metadata } from "next";
import { VT323 } from "next/font/google";

import "@/app/globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Spin Report - heismauri",
  description: "Get insights about your music listening habits from stats.fm and Last.fm"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.className} antialiased`}>{children}</body>
    </html>
  );
}
