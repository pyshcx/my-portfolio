// src/app/layout.tsx
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Pranay Shah | AI & ML Engineer',
  description: 'Portfolio of Pranay Shah, showcasing expertise in AI, ML, and autonomous systems.',
  keywords: 'AI, ML, Computer Vision, Autonomous Systems, Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className} style={{ scrollBehavior: 'smooth' }}>
      <body className="bg-gradient-to-br from-[#1E3D58] via-[#3A6EA5] to-[#00BFA6]">
        {children}
      </body>
    </html>
  );
}
