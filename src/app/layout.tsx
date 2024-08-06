import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "A simple blog built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 shadow-lg">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold">My Blog</h1>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="bg-gray-100 py-6 border-t border-gray-200">
            <div className="container mx-auto px-4 text-center text-gray-600">
              © 2023 My Blog. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
