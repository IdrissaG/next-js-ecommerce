// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface simplifiedProduct {
  [x: string]: any;
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface fullProduct {
  _id: string;
  images: any;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  description: string;
  price_id: string;
}
