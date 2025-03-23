import React from "react";
import { Calendar } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-[#fdfcf5] flex flex-col items-center w-screen">
      {/* Header Section */}
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold mt-5">Job Fair 2022</h1>
        <p className="text-gray-600 mt-3 text-sm">
          Connect with leading companies and schedule interviews during our job fair from May 10-13, 2022.
        </p>
        <button className="btn mt-5 px-4 py-2 bg-black text-white rounded-md text-xs">
          <span className="flex items-center space-x-2">
            <Calendar size={14} />
            <span>Book an Interview</span>
          </span>
        </button>
      </header>

      {/* Participating Companies Section */}
      <section className="w-full px-4">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Participating Companies</h2>
          <p className="text-gray-600 text-sm">Meet these industry leaders at our job fair</p>
        </div>
      </section>
    </div>
  );
}