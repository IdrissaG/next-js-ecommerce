"use client";
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RatingProps } from "../types/rating";

const ProductRating: React.FC<RatingProps> = ({
  productId,
  initialRating = 0,
  initialCount = 0,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(initialRating);
  const [ratingCount, setRatingCount] = useState<number>(initialCount);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRatings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Log the request URL for debugging
      const url = `/api/ratings?productId=${productId}`;
      console.log("Fetching ratings from:", url);

      const response = await fetch(url);
      const data = await response.json();

      // Log the response for debugging
      console.log("Rating response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch ratings");
      }

      setAverageRating(data.averageRating);
      setRatingCount(data.count);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch ratings"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      console.log("Initializing with productId:", productId);
      fetchRatings();
    }
  }, [productId]);

  const handleRating = async (value: number) => {
    if (hasRated || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      // Log the request for debugging
      console.log("Submitting rating:", { productId, rating: value });

      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating: value,
        }),
      });

      const data = await response.json();

      // Log the response for debugging
      console.log("Submit response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit rating");
      }

      setRating(value);
      setHasRated(true);
      await fetchRatings();
    } catch (error) {
      console.error("Submit error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to submit rating"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!productId) {
    return <div>Error: Product ID is required</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {error && <div className="text-red-500 text-sm mb-2">Error: {error}</div>}
      <div className="flex items-center gap-3">
        <Button
          className="rounded-full gap-x-2"
          variant={hasRated ? "secondary" : "default"}
          disabled={isLoading}
        >
          <span className="text-sm">
            {isLoading
              ? "Loading..."
              : averageRating > 0
                ? averageRating.toFixed(1)
                : "No ratings"}
          </span>
          <Star className="h-5 w-5" fill={hasRated ? "none" : "currentColor"} />
        </Button>
        <span className="text-sm text-gray-500 transition duration-100">
          {ratingCount} {ratingCount === 1 ? "Rating" : "Ratings"}
        </span>
      </div>
      {!hasRated && (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="p-1 transition-colors"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleRating(star)}
              disabled={isLoading}
            >
              <Star
                className={`h-6 w-6 ${isLoading ? "opacity-50" : ""}`}
                fill={star <= (hover || rating) ? "currentColor" : "none"}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {isLoading
              ? "Submitting..."
              : hover
                ? `Rate ${hover} stars`
                : "Rate this product"}
          </span>
        </div>
      )}
      {hasRated && (
        <p className="text-sm text-green-600">
          Thanks for rating this product!
        </p>
      )}
    </div>
  );
};

export default ProductRating;
