"use client";

import { CartProvider as USCProvider } from "use-shopping-cart";
import { ReactNode } from "react";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_KEY_STRIPE_KEY as string}
      successUrl="https://next-js-ecommerce-git-main-idrissags-projects.vercel.app/stripe/success"
      cancelUrl="https://next-js-ecommerce-git-main-idrissags-projects.vercel.app/stripe/error"
      currency="XOF"
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}
