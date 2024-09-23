/* eslint-disable */
import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";
import { cache } from "@/lib/cache";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const data = client.fetch(query);
    return data;
  },
  ["/", "getNewest"],
  { revalidate: 60 }
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Newest() {
  const data: simplifiedProduct = await getData();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest products
          </h2>
          <Link className="text-primary flex items-center gap-x-1" href="/All">
            See All{" "}
            <span>
              {" "}
              <ArrowRight />
            </span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {(await data).map(
            (product: {
              _id: Key | null | undefined;
              imageUrl: string | StaticImport;
              slug: any;
              name:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<AwaitedReactNode>
                | (string &
                    ReactElement<any, string | JSXElementConstructor<any>>)
                | (string & Iterable<ReactNode>)
                | (string & ReactPortal)
                | (string & Promise<AwaitedReactNode>)
                | (number &
                    ReactElement<any, string | JSXElementConstructor<any>>)
                | (number & Iterable<ReactNode>)
                | (number & ReactPortal)
                | (number & Promise<AwaitedReactNode>)
                | (bigint &
                    ReactElement<any, string | JSXElementConstructor<any>>)
                | (bigint & Iterable<ReactNode>)
                | (bigint & ReactPortal)
                | (bigint & Promise<AwaitedReactNode>)
                | (false &
                    ReactElement<any, string | JSXElementConstructor<any>>)
                | (false & Iterable<ReactNode>)
                | (false & ReactPortal)
                | (false & Promise<AwaitedReactNode>)
                | (true &
                    ReactElement<any, string | JSXElementConstructor<any>>)
                | (true & Iterable<ReactNode>)
                | (true & ReactPortal)
                | (true & Promise<AwaitedReactNode>)
                | (ReactElement<any, string | JSXElementConstructor<any>> &
                    string)
                | (ReactElement<any, string | JSXElementConstructor<any>> &
                    number)
                | (ReactElement<any, string | JSXElementConstructor<any>> &
                    bigint)
                | (ReactElement<any, string | JSXElementConstructor<any>> &
                    false)
                | (ReactElement<any, string | JSXElementConstructor<any>> &
                    true)
                | (ReactElement<any, string | JSXElementConstructor<any>> &
                    Iterable<ReactNode>)
                | (ReactElement<any, string | JSXElementConstructor<any>> &
                    ReactPortal)
                | (ReactElement<any, string | JSXElementConstructor<any>> &
                    Promise<AwaitedReactNode>)
                | (Iterable<ReactNode> & string)
                | (Iterable<ReactNode> & number)
                | (Iterable<ReactNode> & bigint)
                | (Iterable<ReactNode> & false)
                | (Iterable<ReactNode> & true)
                | (Iterable<ReactNode> &
                    ReactElement<any, string | JSXElementConstructor<any>>)
                | (Iterable<ReactNode> & ReactPortal)
                | (Iterable<ReactNode> & Promise<AwaitedReactNode>)
                | (ReactPortal & string)
                | (ReactPortal & number)
                | (ReactPortal & bigint)
                | (ReactPortal & false)
                | (ReactPortal & true)
                | (ReactPortal &
                    ReactElement<any, string | JSXElementConstructor<any>>)
                | (ReactPortal & Iterable<ReactNode>)
                | (ReactPortal & Promise<AwaitedReactNode>)
                | (Promise<AwaitedReactNode> & string)
                | (Promise<AwaitedReactNode> & number)
                | (Promise<AwaitedReactNode> & bigint)
                | (Promise<AwaitedReactNode> & false)
                | (Promise<AwaitedReactNode> & true)
                | (Promise<AwaitedReactNode> &
                    ReactElement<any, string | JSXElementConstructor<any>>)
                | (Promise<AwaitedReactNode> & Iterable<ReactNode>)
                | (Promise<AwaitedReactNode> & ReactPortal)
                | (Iterable<ReactNode> & string)
                | (Iterable<ReactNode> & number)
                | (Iterable<ReactNode> & bigint)
                | (Iterable<ReactNode> & false)
                | (Iterable<ReactNode> & true)
                | (Iterable<ReactNode> &
                    ReactElement<any, string | JSXElementConstructor<any>>)
                | (Iterable<ReactNode> & Iterable<ReactNode>)
                | (Iterable<ReactNode> & ReactPortal)
                | (Iterable<ReactNode> & Promise<AwaitedReactNode>)
                | null
                | undefined;
              categoryName:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<AwaitedReactNode>
                | Iterable<ReactNode>
                | null
                | undefined;
              price:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<AwaitedReactNode>
                | Iterable<ReactNode>
                | null
                | undefined;
            }) => (
              <div key={product._id} className="group relative">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80 ">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      src={product.imageUrl}
                      alt="Product image"
                      className="w-full h-full object-cover object-center lg:h-full lg:w-full "
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
                    CFA{product.price}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
