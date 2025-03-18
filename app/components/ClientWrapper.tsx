"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Static placeholder for the NavBar
const StaticNavBar = () => (
  <div className="min-h-16 bg-black text-white flex items-center justify-center">
    Welcome To RolBol
  </div>
);

// Dynamically import the NavBar component with a loading fallback
const NavBar = dynamic(() => import("./Navbar"), { 
  ssr: false,
  loading: () => <StaticNavBar />, // Use the static placeholder as the fallback
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* Wrap NavBar in Suspense for better loading handling */}
      <Suspense fallback={<StaticNavBar />}>
        <NavBar />
      </Suspense>
      {children}
    </QueryClientProvider>
  );
}