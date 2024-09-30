"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import both hooks
import { useShoppingCart } from "use-shopping-cart"; // To handle Stripe checkout
import { Button } from "@/components/ui/button";
import Image from "next/image";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams(); // Get search params
  const { checkoutSingleItem } = useShoppingCart(); // To trigger Stripe checkout

  // Get product data from search parameters
  const name = searchParams.get("name");
  const description = searchParams.get("description");
  const price_id = searchParams.get("price_id");
  const imageUrl = searchParams.get("imageUrl"); // Add this line to get the image URL
  const price = searchParams.get("price"); // Add this line to get the price

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckoutClick = async () => {
    if (method === "Stripe") {
      // Trigger Stripe checkout for the product
      checkoutSingleItem(price_id);
    } else if (method === "cod") {
      // Handle Cash on Delivery logic (e.g., send email to admin or user)
      try {
        const response = await fetch("/api/cod", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            productName: name,
            productDescription: description,
          }),
        });

        if (response.ok) {
          alert("Order placed successfully. You will be contacted shortly.");
          router.push("/thank-you"); // Use next/navigation for routing
        } else {
          alert("There was an error processing your order.");
        }
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* Delivery Information Form */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <h1>Delivery Information</h1>
        </div>
        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street Address"
        />
        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zip Code"
          />
          <input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="tel"
          placeholder="Phone Number"
        />
      </div>

      {/* Product Information Section */}
      <div className="flex flex-col w-full sm:max-w-[300px] mt-5 sm:mt-0">
        <h1 className="text-xl sm:text-2xl my-3">Product Information</h1>
        <div className="border border-gray-300 rounded p-4">
          <Image src={imageUrl} alt={name} className="w-full h-auto mb-2" />{" "}
          {/* Product image */}
          <h2 className="font-semibold text-lg">{name}</h2>
          <p className="text-gray-600">{description}</p>
          <p className="text-gray-800 font-semibold mt-2">{price}</p>{" "}
          {/* Product price */}
        </div>

        {/* Payment Method Selection */}
        <h1 className="text-xl sm:text-2xl my-3 mt-6">Payment Method</h1>
        <div className="flex gap-3 flex-col lg:flex-row">
          <div
            onClick={() => setMethod("Stripe")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${method === "Stripe" ? "bg-green-400" : ""}`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              PAY WITH STRIPE
            </p>
          </div>
          <div
            onClick={() => setMethod("cod")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={handleCheckoutClick} className="w-full">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
