import React from 'react';
import { getAllReviews } from '@/lib/markdown';
import ReviewCard from '@/components/ReviewCard';

export default function Home() {
  const reviews = getAllReviews();

  return (
    <main className="min-h-screen striped-background py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-7xl font-bold text-gray-900">
            Couple Food Reviews
          </h1>
          <p className="text-4xl text-gray-600">
            Exploring delicious food spots together, one meal at a time
          </p>
        </header>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </div>
    </main>
  );
}
