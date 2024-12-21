import React from 'react';
import Link from 'next/link';
import { getReviewBySlug, getReviewContentHtml } from '@/lib/markdown';
import StarRating from '@/components/StarRating';
import ImageCarousel from '@/components/ImageCarousel';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center bg-pink-50">
      <span className="text-pink-600">Loading map...</span>
    </div>
  ),
});

interface ReviewPageProps {
  params: {
    slug: string;
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const review = getReviewBySlug(params.slug);
  const content = await getReviewContentHtml(review.content);

  return (
    <main className="min-h-screen striped-background py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-pink-600 hover:text-pink-700"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Reviews
        </Link>

        <article className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="relative h-96 w-full">
            <ImageCarousel
              images={review.images}
              alt={review.title}
              className="h-full"
            />
          </div>

          <div className="p-8">
            <header className="mb-8">
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                {review.title}
              </h1>
              <div className="mb-4 flex items-center text-gray-600">
                <span className="mr-4">{review.restaurant}</span>
                <span>•</span>
                <span className="ml-4">{review.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} label="Rating" />
                <span className="text-lg font-medium text-gray-600">
                  {review.price}
                </span>
              </div>
            </header>

            <div
              className="prose prose-pink max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-8 rounded-xl overflow-hidden">
              <Map
                lat={review.coordinates.lat}
                lng={review.coordinates.lng}
                className="h-[400px]"
              />
            </div>

            <footer className="mt-8 border-t border-gray-100 pt-8 text-gray-500">
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </footer>
          </div>
        </article>
      </div>
    </main>
  );
}
