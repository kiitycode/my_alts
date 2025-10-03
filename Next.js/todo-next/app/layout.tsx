import './globals.css';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';

export const metadata = { title: 'Todo Next', description: 'Migrated todo app' };

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col p-4">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 my-6 flex justify-center">
            <div className="w-full md:w-1/2 max-w-3xl mx-auto app-panel">
              {children}
            </div>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
