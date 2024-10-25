/* eslint-disable */
import { createClient } from "@sanity/client";
import { type NextRequest, NextResponse } from "next/server";

// Create a Sanity client for your API route
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// GET endpoint to fetch ratings
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Log for debugging
    console.log("Fetching ratings for product:", productId);

    // Query to get ratings for the product
    const query = `*[_type == "rating" && product._ref == $productId] {
      rating
    }`;

    const ratings = await client.fetch(query, { productId });

    // Log for debugging
    console.log("Found ratings:", ratings);

    if (!ratings.length) {
      return NextResponse.json({
        averageRating: 0,
        count: 0,
      });
    }

    const sum = ratings.reduce(
      (acc: number, curr: any) => acc + curr.rating,
      0
    );
    const averageRating = Number((sum / ratings.length).toFixed(1));

    return NextResponse.json({
      averageRating,
      count: ratings.length,
    });
  } catch (error) {
    // Log the full error
    console.error("Detailed error:", error);

    return NextResponse.json(
      { error: "Failed to fetch ratings" },
      { status: 500 }
    );
  }
}

// POST endpoint to create ratings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, rating } = body;

    // Validate input
    if (!productId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log for debugging
    console.log("Creating rating:", { productId, rating });

    // Create the rating document
    const ratingDoc = {
      _type: "rating",
      product: {
        _type: "reference",
        _ref: productId,
      },
      rating: rating,
      createdAt: new Date().toISOString(),
    };

    const result = await client.create(ratingDoc);

    // Log success
    console.log("Rating created:", result);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    // Log the full error
    console.error("Detailed error:", error);

    return NextResponse.json(
      { error: "Failed to create rating" },
      { status: 500 }
    );
  }
}
