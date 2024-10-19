/* eslint-disable */
import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cache } from "@/lib/cache";
import { MotionDiv } from "./MotionDiv";

// Cache function for fetching data
const getData = cache(
  () => {
    const query = `*[_type == 'product'][0...4] | order(_createdAt asc){
      _id,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      "imageUrl": images[0].asset->url
    }`;
    return client.fetch(query);
  },
  ["/", "getNewest"],
  { revalidate: 60 }
);

// Variants for animation
const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const childvariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Product type definition
interface Product {
  _id: Key | null | undefined;
  imageUrl: string | StaticImport;
  slug: string;
  name: string;
  categoryName: string;
  price: string | number;
}

// Main component
export default async function Newest() {
  const data: Product[] = await getData();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest products
          </h2>
          <Link className="text-primary flex items-center gap-x-1" href="/All">
            See All <ArrowRight />
          </Link>
        </div>

        <MotionDiv
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{
            ease: "easeInOut",
            duration: "0.5",
          }}
          viewport={{ amount: 0 }}
          className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          {data.map((product) => (
            <MotionDiv
              variants={childvariants}
              key={product._id}
              className="group relative"
            >
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </Link>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  CFA {product.price}
                </p>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </div>
  );
}
