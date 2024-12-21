import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const reviewsDirectory = path.join(process.cwd(), 'src/content/reviews');

export interface ReviewMeta {
  title: string;
  restaurant: string;
  dish: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  price: string;
  date: string;
  images: string[];
  slug: string;
}

export interface Review extends ReviewMeta {
  content: string;
}

export function getReviewSlugs() {
  return fs.readdirSync(reviewsDirectory);
}

export function getReviewBySlug(slug: string): Review {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(reviewsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...(data as ReviewMeta),
    slug: realSlug,
    content: content,
  };
}

export async function getReviewContentHtml(content: string) {
  const result = await remark()
    .use(html, { sanitize: false }) // Allow HTML in markdown for image support
    .process(content);
  return result.toString();
}

export function getAllReviews(): ReviewMeta[] {
  const slugs = getReviewSlugs();
  const reviews = slugs
    .map((slug) => getReviewBySlug(slug))
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  return reviews;
}
