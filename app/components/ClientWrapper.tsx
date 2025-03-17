// app/components/ClientWrapper.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("./Navbar"), { ssr: false });

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      {children}
    </QueryClientProvider>
  );
}