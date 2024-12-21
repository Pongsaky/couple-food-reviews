'use client';

import React from 'react';
import Link from 'next/link';
import StarRating from './StarRating';
import ImageCarousel from './ImageCarousel';
import { ReviewMeta } from '@/lib/markdown';

interface ReviewCardProps {
  review: ReviewMeta;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Link
      href={`/review/${review.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-105"
    >
      <div className="relative h-48 w-full">
        <ImageCarousel
          images={review.images}
          alt={review.title}
          className="h-full"
        />
      </div>
      <div className="p-6">
        <h2 className="mb-2 text-3xl font-semibold text-gray-800 group-hover:text-pink-600">
          {review.title}
        </h2>
        <p className="mb-2 text-lg text-gray-600">
          {review.restaurant} • {review.location}
        </p>
        <div className="flex items-center justify-between">
          <StarRating rating={review.rating} label="Rating" />
          <span className="text-xl font-medium text-gray-600">{review.price}</span>
        </div>
        <div className="mt-4 text-xl text-gray-500">
          {new Date(review.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </Link>
  );
}
