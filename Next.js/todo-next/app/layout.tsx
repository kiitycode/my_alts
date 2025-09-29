import './globals.css';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';

export const metadata = { title: 'Todo Next', description: 'Migrated todo app' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="min-h-[60vh] flex justify-center">
            {/* shared panel styling applied via .app-panel in globals.css */}
            <div className="w-full md:w-1/2 max-w-3xl mx-auto px-4 py-6 app-panel">
              {children}
            </div>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
