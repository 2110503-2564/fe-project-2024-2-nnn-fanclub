import React from "react";
import { CompanyModel } from "../../interface";

interface CompanyCardProps {
  company: CompanyModel;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{company.name}</h2>
        <p className="text-sm text-gray-500">{company.description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <span className="material-icons text-gray-500 mr-2">place</span>
            <span className="text-sm">{company.address}</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-gray-500 mr-2">phone</span>
            <span className="text-sm">{company.telephone}</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-gray-500 mr-2">link</span>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              {company.website}
            </a>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary">Sign in to book</button>
        </div>
      </div>
    </div>
  );
}