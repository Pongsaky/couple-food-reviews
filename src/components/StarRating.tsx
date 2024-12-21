'use client';

import React from 'react';

interface StarRatingProps {
  rating: number;
  label?: string;
  className?: string;
}

export default function StarRating({ rating, label, className = '' }: StarRatingProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {label && (
        <span className="text-lg font-medium text-gray-700">{label}</span>
      )}
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400'
                : star - 0.5 <= rating
                ? 'text-yellow-200'
                : 'text-gray-300'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
