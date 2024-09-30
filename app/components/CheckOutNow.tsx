"use client";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";
import { useRouter } from "next/navigation";

export default function CheckoutNow({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const router = useRouter();
  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };

  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push(`/checkout?name=${name}&price_id=${price_id}`);
      }}
    >
      CheckOut Now
    </Button>
  );
}
