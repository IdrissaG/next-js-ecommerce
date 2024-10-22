/* eslint-disable */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail } from "lucide-react";

export default function AboutUs() {
  // You can replace these with your actual contact details
  const whatsappNumber = "+221772993345"; // Replace with your WhatsApp number
  const emailAddress = "contact@zeinabstore.com"; // Replace with your email

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          About Zeinab<span className="text-primary">Store</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Bringing authentic African fashion to the modern world with elegance
          and style.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded with a passion for African fashion, ZeinabStore began as a
            dream to share the rich cultural heritage of African clothing with
            the world. Our journey started with a small collection of
            hand-picked pieces and has grown into a curated selection of the
            finest African garments.
          </p>
          <p className="text-gray-600">
            Every piece in our collection tells a story - from traditional
            Boubous to modern Ensembles, each item represents the perfect blend
            of tradition and contemporary style.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">We're committed to:</p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
              Preserving and promoting African fashion heritage
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
              Supporting local artisans and sustainable practices
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
              Providing high-quality, authentic garments
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
              Creating a bridge between traditional and modern fashion
            </li>
          </ul>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p className="text-gray-600">
              We carefully select each piece to ensure the highest quality
              materials and craftsmanship.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
            <p className="text-gray-600">
              Every garment reflects genuine African design and cultural
              significance.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">
              We blend traditional elements with modern design for contemporary
              appeal.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          We'd love to hear from you! Choose your preferred way to connect with
          us:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </button>
          <button
            onClick={handleEmailClick}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            <Mail size={20} />
            Send us an Email
          </button>
        </div>
      </div>
    </div>
  );
}
