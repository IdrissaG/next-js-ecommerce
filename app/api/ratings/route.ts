import { client } from "@/app/lib/sanity";

export async function POST(request: Request) {
  try {
    const { productId, rating } = await request.json();

    const doc = {
      _type: "rating",
      product: {
        _type: "reference",
        _ref: productId,
      },
      rating: rating,
      createdAt: new Date().toISOString(),
    };

    await client.create(doc);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle the unknown error type
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
