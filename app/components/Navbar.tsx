"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon, Search, X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { client } from "../lib/sanity";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  imageUrl: string;
  category?: {
    name: string;
  };
}

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
  const { cartCount, handleCartClick } = useShoppingCart();
  const inputRef = useRef<HTMLInputElement>(null);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const performSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const searchQuery = `*[_type == "product" && (name match $searchQuery || description match $searchQuery)] {
        _id,
        name,
        description,
        price,
        "slug": slug.current,
        "imageUrl": images[0].asset->url,
        category->{ name }
      }`;

      const results = await client.fetch(searchQuery, {
        searchQuery: `*${query}*`,
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSearchQuery(value);
    performSearch(value);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && inputValue.length >= 2) {
      performSearch(inputValue);
    }
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleSelectProduct = (product: Product) => {
    router.push(`/product/${product.slug}`);
    setOpen(false);
    setShowSearch(false);
  };

  const handleMenuItemClick = (href: string) => {
    router.push(href);
    setIsMenuOpen(false);
  };

  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        {/* Menu Button (Mobile) */}
        <div className="lg:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((link, idx) => (
                  <Button
                    key={idx}
                    variant={pathname === link.href ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => handleMenuItemClick(link.href)}
                  >
                    {link.name}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

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
          className={`flex-1 max-w-md mx-4 ${
            showSearch
              ? "fixed inset-x-0 top-0 z-50 bg-white p-4 flex items-center sm:relative sm:p-0"
              : "hidden sm:block"
          }`}
        >
          {/* Mobile Close Button */}
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 sm:hidden"
              onClick={() => setShowSearch(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}

          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="text-sm text-gray-500">
                  {inputValue || "Search products..."}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[400px] p-0 sm:w-[400px]"
              align="start"
              sideOffset={5}
            >
              <Command>
                <div className="flex items-center border-b px-3">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Search products..."
                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <CommandList>
                  <CommandEmpty>
                    {isSearching
                      ? "Searching..."
                      : inputValue.length >= 2
                        ? "No results found."
                        : "Type at least 2 characters to search"}
                  </CommandEmpty>
                  <CommandGroup>
                    {searchResults.map((product) => (
                      <CommandItem
                        key={product._id}
                        onSelect={() => handleSelectProduct(product)}
                        className="cursor-pointer"
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

          {/* Mobile Cart Button when search is open */}
          {showSearch && (
            <Button
              variant="outline"
              onClick={() => handleCartClick()}
              className="ml-2 sm:hidden"
            >
              <div className="relative">
                <ShoppingBagIcon />
                {(cartCount ?? 0) > 0 && (
                  <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-xs text-white">{cartCount}</span>
                  </div>
                )}
              </div>
            </Button>
          )}
        </div>

        {/* Navigation (Desktop) */}
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
              {(cartCount ?? 0) > 0 && (
                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-xs text-white">{cartCount}</span>
                </div>
              )}
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
