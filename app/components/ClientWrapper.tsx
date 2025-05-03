"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";

const StaticNavBar = () => (
  <div className="min-h-16 bg-black text-white z-[50] flex items-center justify-center">
    Welcome To RolBol
  </div>
);

const NavBar = dynamic(() => import("./Navbar"), {
  ssr: false,
  loading: () => <StaticNavBar />,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<StaticNavBar />}>
        <NavBar setActiveTab={setActiveTab} />
      </Suspense>
      {children}
    </QueryClientProvider>
  );
}