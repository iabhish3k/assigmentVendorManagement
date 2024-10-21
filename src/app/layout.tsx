import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'Venodr Managment',
  description: 'Venodr Managment Application',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
