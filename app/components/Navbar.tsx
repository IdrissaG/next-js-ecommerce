/* eslint-disable */
//@ts-ignore
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBagIcon, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import { useState } from "react";
import { createClient } from "next-sanity";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "use-shopping-cart/core";

// Sanity Client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-02-22",
  useCdn: true,
});

const links = [
  { name: "Home", href: "/" },
  { name: "Ensemble", href: "/Ensemble" },
  { name: "Robe", href: "/Robe" },
  { name: "Boubou", href: "/Boubou" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { handleCartClick, cartCount } = useShoppingCart();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);

  // Debounced search function with inline query
  const handleSearch = async (value: string) => {
    setSearchQuery(value);

    if (value.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Sanity query directly in the component
      const query = `*[_type == "product" && (name match $searchQuery || description match $searchQuery)] {
        _id,
        name,
        description,
        price,
        "slug": slug.current,
        "imageUrl": images[0].asset->url,
        category->{ name }
      }`;

      const results = await client.fetch(query, {
        searchQuery: `*${value}*`,
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    router.push(`/product/${product.slug}`);
    setOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        {/* Logo */}
        <div className={`${showSearch ? "hidden sm:block" : "block"}`}>
          <Link href="/">
            <h1 className="text-2xl md:text-4xl font-bold">
              Zeinab<span className="text-primary">Store</span>
            </h1>
          </Link>
        </div>

        {/* Search Bar with Popover */}
        <div
          className={`flex-1 max-w-md mx-4 ${showSearch ? "block" : "hidden sm:block"}`}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="text-sm text-gray-500">
                  {searchQuery || "Search products..."}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search products..."
                  value={searchQuery}
                  onValueChange={handleSearch}
                />
                <CommandList>
                  <CommandEmpty>
                    {isSearching ? "Searching..." : "No results found."}
                  </CommandEmpty>
                  <CommandGroup>
                    {searchResults.map((product) => (
                      <CommandItem
                        key={product._id}
                        onSelect={() => handleSelectProduct(product)}
                      >
                        <div className="flex items-center gap-2">
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              CFA{product.price} - {product.category?.name}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Navigation */}
        <nav
          className={`hidden gap-12 lg:flex 2xl:ml-16 ${showSearch ? "hidden lg:flex" : ""}`}
        >
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Cart and Search Icons */}
        <div className="flex divide-x border-r sm:border-l">
          {/* Mobile Search Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowSearch(true)}
            className={`flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:w-24 rounded-none ${
              showSearch ? "hidden sm:flex" : "flex sm:hidden"
            }`}
          >
            <Search />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Search
            </span>
          </Button>

          {/* Cart Button */}
          <Button
            variant="outline"
            onClick={() => handleCartClick()}
            className={`flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:w-24 rounded-none relative ${
              showSearch ? "hidden sm:flex" : "flex"
            }`}
          >
            <div className="relative">
              <ShoppingBagIcon />
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-xs text-white">{cartCount}</span>
                </div>
              )}
            </div>
            {/* <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span> */}
          </Button>
        </div>
      </div>
    </header>
  );
}
