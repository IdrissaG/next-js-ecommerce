import React, { useState } from "react";
import { useRouter } from "next/router";
import { useShoppingCart } from "use-shopping-cart"; // To handle Stripe checkout

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
  const { checkoutSingleItem } = useShoppingCart(); // To trigger Stripe checkout
  const { name, description, price_id } = router.query; // Product data from query params

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
          router.push("/thank-you");
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
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
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
        {/* Other input fields */}
        {/* Payment Method Selection */}
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
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
    </div>
  );
};

export default PlaceOrder;
