import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Couple Food Reviews',
  description: 'Exploring delicious food spots together, one meal at a time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
