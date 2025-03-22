import React from "react";
import { CompanyModel } from "../../interface";
import { Building, MapPin, Phone, Link } from "lucide-react";
interface CompanyCardProps {
  company: CompanyModel;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="card w-full max-w-sm bg-[#fffff5] shadow-xl rounded-2xl">
      <div className="card-body">
        <div className="flex items-center space-x-2">
          <Building size={36} />
          <h2 className="card-title text-lg font-bold">{company.name}</h2>
        </div>
        <p className="text-sm">{company.description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin size={24} />
            <span className="text-sm">{company.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={24} />
            <span className="text-sm">{company.telephone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link size={24} />
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
        <div className="card-actions mt-4">
          <button className="btn w-full border border-black bg-white text-black rounded-lg">
            Sign in to book
          </button>
        </div>
      </div>
    </div>
  );
}
