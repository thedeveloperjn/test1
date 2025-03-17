// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic"; // Import dynamic
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import ScrollToTop from "./components/Scrolltotop";
import Footer from "./components/Footer";
import { Suspense } from "react";

// Dynamically load NavBar with SSR disabled
const NavBar = dynamic(() => import("./components/Navbar"), { ssr: false });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ROLBOL",
  description: "Your description here",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

        {/* Wrap ScrollToTop in Suspense */}
        <Suspense fallback={<div className="h-12" />}>
          <ScrollToTop />
        </Suspense>

        {/* NavBar is dynamically loaded client-side */}
        <NavBar />

        {/* ClientWrapper for other client-side logic (without NavBar) */}
        <ClientWrapper>{children}</ClientWrapper>

        <Footer />
      </body>
    </html>
  );
}