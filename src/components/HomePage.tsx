import React from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-c2 flex flex-col items-center w-screen h-auto pb-8 md:pb-12">
      {/* Header Section */}
      <header className="text-center py-6">
        <h1 className="text-2xl md:text-5xl font-bold mt-3 md:mt-5">Job Fair 2022</h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          Connect with leading companies and schedule interviews during our job
          fair from May 10-13, 2022.
        </p>
        <button className="btn mt-5 px-2 py-1 md:px-4 md:py-2 bg-black text-white rounded-md text-xs hover:bg-white hover:text-black hover:border-black transition duration-500 ease-in-out">
          <span className="flex items-center space-x-2">
            <Calendar size={14} />
            <Link href="/booking" className="text-sm md:text-base">Book an Interview</Link>
          </span>
        </button>
      </header>

      {/* Participating Companies Section */}
      <section className="w-full px-4">
        <div className="text-center mb-4">
          <h2 className="text-base md:text-xl font-semibold">Participating Companies</h2>
          <p className="text-gray-600 text-xs md:text-sm">
            Meet these industry leaders at our job fair
          </p>
        </div>
      </section>
    </div>
  );
}
