import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const client = createClient({
  projectId: "rq0e4a9i",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
