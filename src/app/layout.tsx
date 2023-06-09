import NavBar from '@/components/NavBar';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Temp - Blog Web Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <>
          {/* @ts-expect-error Async Server Component */}
          <NavBar />
          {children}
        </>
      </body>
    </html>
  );
}
