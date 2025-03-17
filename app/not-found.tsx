// app/_not-found.tsx
import { Suspense } from "react";
import Link from "next/link";
import NavBar from "./components/Navbar"; // Adjust the import path if needed

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Wrap NavBar in Suspense to handle useSearchParams */}
      <Suspense fallback={<div className="h-[80px] bg-black" />}>
        <NavBar />
      </Suspense>
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-4 text-lg">The page you’re looking for doesn’t exist.</p>
        <Link
          href="/"
          className="text-blue-400 hover:underline text-lg font-semibold"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}