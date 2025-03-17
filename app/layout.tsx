"use client"; // This is necessary for client-side features like useState and QueryClientProvider

import type { Metadata } from "next"; // Metadata cannot be used in Client Components
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/Scrolltotop";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Import } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  // Create a QueryClient instance once per app lifecycle
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {/* External FontAwesome stylesheet */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />

        {/* Scroll-to-top button */}
        <ScrollToTop />

        <QueryClientProvider client={queryClient}>
  <NavBar/>
  {children}
  <Footer />
</QueryClientProvider>
      </body>
    </html>
  );
}