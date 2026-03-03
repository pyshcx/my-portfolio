import './globals.css';
import { Poppins } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Pranay Shah | AI & ML Engineer',
    template: '%s | Pranay Shah'
  },
  description: 'Portfolio of Pranay Shah, showcasing expertise in AI, ML, autonomous systems, and Formula Student projects. Passionate about path planning, SLAM, and computer vision.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Autonomous Systems',
    'Formula Student',
    'React Developer',
    'Path Planning',
    'SLAM',
    'Computer Vision',
    'Deep Learning',
    'PyTorch',
    'TensorFlow'
  ],
  authors: [{ name: 'Pranay Shah', url: 'https://pranayshah.online' }],
  creator: 'Pranay Shah',
  publisher: 'Pranay Shah',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pranayshah.online',
    title: 'Pranay Shah | AI & ML Engineer',
    description: 'Portfolio showcasing AI, ML, and autonomous systems expertise with Formula Student experience',
    siteName: 'Pranay Shah Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pranay Shah - AI & ML Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranay Shah | AI & ML Engineer',
    description: 'Portfolio showcasing AI, ML, and autonomous systems expertise',
    creator: '@pyshcx',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00BFA6' },
    { media: '(prefers-color-scheme: dark)', color: '#1E3D58' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${poppins.className}`}>
      <head>
        <link type="image/png" sizes="96x96" rel="icon" href="/icons8-p-96.png" />
        <link rel="apple-touch-icon" href="/icons8-p-96.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00BFA6" />
      </head>
      <body
        className="bg-gradient-to-br from-[#1E3D58] via-[#3A6EA5] to-[#00BFA6] antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}