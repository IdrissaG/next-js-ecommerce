"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RatingProps } from "../types/rating";
// import type { RatingProps } from "@/app/types/rating";

const ProductRating: React.FC<RatingProps> = ({
  productId,
  initialRating = 4.2,
  initialCount = 56,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(initialRating);
  const [ratingCount, setRatingCount] = useState<number>(initialCount);
  const [hasRated, setHasRated] = useState<boolean>(false);

  const handleRating = async (value: number) => {
    if (hasRated) return;

    setRating(value);
    setHasRated(true);

    // Calculate new average
    const newTotal = averageRating * ratingCount + value;
    const newCount = ratingCount + 1;
    const newAverage = newTotal / newCount;

    setAverageRating(Number(newAverage.toFixed(1)));
    setRatingCount(newCount);

    try {
      await fetch("/api/ratings", {
        method: "POST",
        body: JSON.stringify({
          productId,
          rating: value,
        }),
      });
    } catch (error) {
      console.error("Failed to save rating:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Button
          className="rounded-full gap-x-2"
          variant={hasRated ? "secondary" : "default"}
        >
          <span className="text-sm">{averageRating}</span>
          <Star className="h-5 w-5" fill={hasRated ? "none" : "currentColor"} />
        </Button>
        <span className="text-sm text-gray-500 transition duration-100">
          {ratingCount} Ratings
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
            >
              <Star
                className="h-6 w-6"
                fill={star <= (hover || rating) ? "currentColor" : "none"}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {hover ? `Rate ${hover} stars` : "Rate this product"}
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
