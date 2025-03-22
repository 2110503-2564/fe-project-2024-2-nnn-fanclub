import React from "react";
import CompanyCard from "./CompanyCard";

interface CardpanelProps {
  companies: CompanyModel[];
}

export default function Cardpanel({ companies }: CardpanelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  );
}