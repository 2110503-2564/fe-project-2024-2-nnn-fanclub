import React from "react";
import CompanyCard from "./CompanyCard";

interface CardpanelProps {
  companies: CompanyModel[];
}

export default function CardPanel({ companies }: CardpanelProps) {
  return (
    <div className="bg-c2 w-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 p-6 justify-items-center">
      {companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  );
}