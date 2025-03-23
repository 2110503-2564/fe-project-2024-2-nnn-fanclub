import React from "react";
import { Building, MapPin, Phone, Link } from "lucide-react";
interface CompanyCardProps {
  company: CompanyModel;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="card w-full max-w-xs bg-[#fffff5] border rounded-lg p-4">
      <div className="card-body">
        <div className="flex items-center space-x-2">
          <Building size={28} />
          <h2 className="card-title text-base font-bold">{company.name}</h2>
        </div>
        <p className="text-xs">{company.description}</p>
        <div className="mt-3 space-y-1">
          <div className="flex items-center space-x-2">
            <MapPin size={20} />
            <span className="text-xs">{company.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={20} />
            <span className="text-xs">{company.telephone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link size={20} />
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline"
            >
              {company.website}
            </a>
          </div>
        </div>
        <div className="card-actions mt-3">
          <button className="btn w-full border border-black bg-white text-black rounded-md text-sm">
            Sign in to book
          </button>
        </div>
      </div>
    </div>
  );
}