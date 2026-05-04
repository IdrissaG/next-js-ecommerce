/* eslint-disable */
import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";
import { revalidatePath } from "next/cache";

async function getData(category?: string) {
  let query;
  if (category === "All") {
    query = `*[_type == 'product']{
      _id,
      "imageUrl": images[0].asset->url,
      price, name,
      "slug": slug.current,
      "categoryName": category->name
    }`;
  } else if (category) {
    query = `*[_type == 'product' && category->name == "${category}"]{
      _id,
      "imageUrl": images[0].asset->url,
      price, name,
      "slug": slug.current,
      "categoryName": category->name
    }`;
  } else {
    query = `*[_type == 'product']{
      _id,
      "imageUrl": images[0].asset->url,
      price, name,
      "slug": slug.current,
      "categoryName": category->name
    }`;
  }
  const data = await client.fetch(query);
  revalidatePath("/Ensemble");
  revalidatePath("/Robe");
  revalidatePath("/Boubou");
  revalidatePath("/All");
  revalidatePath("/");
  return data;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(params.category);

  return (
    <div style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "120px" }}>
      <div className="section">

        {/* En-tête */}
        <div className="section-header">
          <div>
            <p className="section-label">Collection</p>
            <h2 className="section-title">
              {params.category === "All" ? (
                <>Toutes les <em>Pièces</em></>
              ) : (
                <><em>{params.category}</em></>
              )}
            </h2>
          </div>
          <Link href="/" className="section-link">← Retour</Link>
        </div>

        {/* Grille produits */}
        <div className="grid-4">
          {data.map((product) => (
            <div key={product._id} className="card">
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={533}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Link>
              <div className="card-info">
                <div className="card-name">{product.name}</div>
                <div className="card-price">CFA {product.price}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}