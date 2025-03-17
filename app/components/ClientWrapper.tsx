// app/components/ClientWrapper.tsx
"use client"; // This file is a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import NavBar from "./Navbar";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  // Create a QueryClient instance once per app lifecycle
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      {children}
    </QueryClientProvider>
  );
}