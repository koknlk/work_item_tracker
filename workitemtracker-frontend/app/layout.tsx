'use client';

import { ReactNode } from 'react';


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body> 
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}