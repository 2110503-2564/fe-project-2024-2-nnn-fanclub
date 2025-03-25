import React from "react";
import { Building, Calendar, MapPin, Phone, Link } from "lucide-react";

interface BookingCardProps {
  name: string;
  address: string;
  website: string;
  description: string;
  telephone: string;
  onEdit: () => void;
  onRemove: () => void;
}

export default function InterviewCard({
  name,
  description,
  address,
  telephone,
  website,
  onEdit,
  onRemove,
}: BookingCardProps) {

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-2 md:p-6 border-storke border-1 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-1 transition duration-300 ease-in-out">
      {/* Company Info */}
      <div className="flex flex-col justify-items-start space-y-3 w-3/4">
        <div className="flex items-center space-x-3">
          <Building size={25} />
          <h2 className="card-title text-base md:text-3xl font-bold">{name}</h2>
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="card-title text-xs md:text-sm text-gray-500">
            {description}
          </h2>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin size={15} />
          <h2 className="card-title text-xs md:text-base text-gray-500">
            {address}
          </h2>
        </div>
        <div className="flex items-center space-x-3">
          <Phone size={15} />
          <h2 className="card-title text-xs md:text-base text-gray-500">
            {telephone}
          </h2>
        </div>
        <div className="flex items-center space-x-3">
          <Link size={20} />
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="card-title text-xs md:text-base text-blue-4  00 hover:underline"
          >
            {website}
          </a>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-x-3 md:space-x-4 gap-3 md:gap-12 mt-3">
        <button
          onClick={onEdit}
          className="px-3 md:px-6 py-1 md:py-2 m-0 border border-storke rounded-md hover:bg-gray-200 transition duration-300 cursor-pointer"
        >
          <div className="text-black text-sx md:text-base">Edit Company</div>
        </button>
        <button
          onClick={onRemove}
          className="px-3 md:px-6 py-1 md:py-2 border border-storke rounded-md  bg-bgred hover:bg-red-400 hover:border-black border-1 transition duration-300 cursor-pointer"
        >
          <div className="text-black text-sm md:text-base">Remove Company</div>
        </button>
      </div>
    </div>
  );
}
