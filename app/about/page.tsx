// about/page.tsx

import { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
  title: "About Us - ZeinabStore",
  description:
    "Discover ZeinabStore's journey in bringing authentic African fashion to the modern world with elegance and style. Learn about our mission, values, and commitment to preserving African fashion heritage.",
  openGraph: {
    title: "About Us - ZeinabStore",
    description: "Authentic African fashion with elegance and style",
    images: ["/about-banner.jpg"], // Add your actual image path
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - ZeinabStore",
    description: "Authentic African fashion with elegance and style",
  },
};

export default function AboutPage() {
  return <AboutUsClient />;
}
