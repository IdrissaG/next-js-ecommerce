import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZEINAB — Create Your Own Trend",
  description: "Dakar-born fashion boutique. Feminine. Bold. Timeless.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}