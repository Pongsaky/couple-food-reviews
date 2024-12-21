'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function ImageCarousel({ images = [], alt, className = '' }: ImageCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: images.length > 1 });

  if (!images || images.length === 0) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center bg-pink-50">
          <span className="text-pink-600">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} ref={emblaRef}>
      <div className="flex">
        {images.map((image, index) => (
          <div key={index} className="relative h-full w-full flex-[0_0_100%]">
            <Image
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
