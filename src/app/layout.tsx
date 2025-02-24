// src/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Pranay Shah Portfolio',
  description: 'A personal portfolio website showcasing AI, ML, and autonomous systems expertise.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-lidar-black text-lidar-white">
        {children}
      </body>
    </html>
  );
}
