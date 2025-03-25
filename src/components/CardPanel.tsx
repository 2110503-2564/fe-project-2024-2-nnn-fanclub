import React from "react";
import CompanyCard from "./CompanyCard";

interface CardpanelProps {
  companies: CompanyModel[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CardPanel({ companies, currentPage, totalPages, onPageChange }: CardpanelProps) {
  return (
    <div className="bg-c2 w-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 p-6 justify-items-center">
      {companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
      <div className="col-span-full flex justify-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}