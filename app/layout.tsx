// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import ScrollToTop from "./components/Scrolltotop";
import Footer from "./components/Footer";
import { Suspense } from "react";
import { PlayerProvider } from "./context/PlayerContext"; // Import PlayerProvider
import StickyPlayer from "./components/StickyPlayer"; // Import StickyPlayer
import '@fontsource/noto-sans/400.css'; // Regular
import '@fontsource/noto-sans/700.css'; // Bold

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
  icons: {
    icon: "/favicon.ico", 
    apple: "/favicon.ico", // For Apple devices
  },
};




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome */}
        
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* Lightbox2 CSS and JS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/css/lightbox.min.css"
          integrity="sha512-ZKX+BvQihRJPA8CROKBhDNvoc2aDMOdAlcm7TUQY+35XYtrd3yh95QOOhsPDQY9QnKE0Wqag9y38OIgEvb88=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/js/lightbox.min.js"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          defer // Add defer to ensure script loads after DOM
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {/* Wrap the entire app with PlayerProvider */}
        <PlayerProvider>
          <Suspense fallback={<div className="h-12" />}>
            <ScrollToTop />
          </Suspense>
          <ClientWrapper>
            {children}
            {/* Render the sticky player globally */}
            <StickyPlayer />
          </ClientWrapper>
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}