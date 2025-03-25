import React from "react";
import { Building, MapPin, Phone, Link } from "lucide-react";
import Links from "next/link";
import { useSession } from "next-auth/react";
interface CompanyCardProps {
  company: CompanyModel;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const {data: session} = useSession();
  const roles = session?.user.role;

  return (
    <div className="card w-full max-w-xs bg-c2 border rounded-lg border-storke drop-shadow-lg hover:drop-shadow-xl hover:-translate-1 transition duration-500 ease-in-out">
      <div className="card-body">
        {/* Company Name */}
        <div className="flex items-center space-x-2">
          <Building size={28} />
          <h2 className="card-title text-xl font-bold">{company.name}</h2>
        </div>
        {/* Company Description */}
        <p className="text-xs">{company.description}</p>
        {/* Company Contact Information */}
        <div className="mt-3 space-y-3">
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
        {/* Button */}
        <div className="card-actions mt-2">
          {
            session ? (
              <Links href={`/booking/new?id=${company._id}`} className="btn w-full border border-storke bg-white text-black rounded-md text-xs md:text-sm hover:bg-gray-100 hover:border-black">
                Book
              </Links>
            ) : (
              <Links href="/auth/signin" className="btn w-full border border-storke bg-white text-black rounded-md text-xs md:text-sm hover:bg-gray-100 hover:border-black">
                Sign in to book
              </Links>
            )
          }
        </div>
      </div>
    </div>
  );
}