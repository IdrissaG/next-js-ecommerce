/* eslint-disable */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { client } from "../lib/sanity";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const PlaceOrder: React.FC = () => {
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

  const [cartItems, setCartItems] = useState<any[]>([]); // Any type to avoid issues
  const router = useRouter();
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { checkoutSingleItem } = useShoppingCart();

  useEffect(() => {
    // Retrieve the cart items from localStorage
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  // Get product data from Sanity
  const getProductByName = async (productName: string) => {
    const query = `*[_type == "product" && name == $name]{
      _id,
      name,
      price,
      description,
      image
    }`;

    const params = { name: productName };

    try {
      const product = await client.fetch(query, params);
      console.log("Product Data:", product);
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form fields
  const isFormValid = (): boolean => {
    for (const field in formData) {
      const typedField = field as keyof typeof formData;
      if (formData[typedField].trim() === "") {
        alert(`Please fill out the ${typedField} field.`);
        return false;
      }
    }
    return true;
  };

  // Handle checkout click
  const handleCheckoutClick = async () => {
    if (method === "Stripe") {
      checkoutSingleItem(cartItems[0]?.price_id); // Assuming price_id exists
    } else if (method === "cod") {
      if (!isFormValid()) {
        return;
      }

      try {
        const response = await fetch("/api/cod", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            productName: cartItems[0]?.name || "test",
            productPrice: cartItems[0]?.price || "testdes",
            productQuantity: cartItems[0]?.quantity,
          }),
        });

        if (response.ok) {
          setAlertMessage("Order placed successfully.");
          setAlertVisible(true);

          // Redirect to the thank-you page after a short delay
          setTimeout(() => {
            router.push("/thank-you");
          }, 2000);
        } else {
          const errorData = await response.json();
          alert(`Error processing your order: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
            {cartItems.map((item) => (
              <div key={item.id} className="border border-gray-300 rounded p-4">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200">
                  <Image
                    src={item.image}
                    alt="Product image"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-600 line-clamp-4">{item.description}</p>
                <p className="text-gray-800 font-semibold mt-2">
                  XOF{item.price}
                </p>
              </div>
            ))}

            {/* Payment Method Selection */}
            <h1 className="text-xl sm:text-2xl my-3 mt-6">Payment Method</h1>
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("Stripe")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "Stripe" ? "bg-green-400" : ""
                  }`}
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
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
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
      </div>
    </div>
  );
};

export default PlaceOrder;
