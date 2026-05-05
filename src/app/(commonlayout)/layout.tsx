import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar at the top */}
      <Navbar />

      {/* Main content area that will render meals, orders, privacy, etc. */}
      {/* flex-grow ensures the footer stays at the bottom if the page content is short */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}