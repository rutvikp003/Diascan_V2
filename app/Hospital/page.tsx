"use client";

import Link from "next/link";
import Hospitals from "@/components/Hospitals-page/hospital-l";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
        Welcome to <span className="text-blue-600">Hospital Finder</span> 🏥
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-md mb-6">
        Easily locate nearby hospitals and get directions with just one click!
      </p>
      <Hospitals/>
    </div>
  );
}