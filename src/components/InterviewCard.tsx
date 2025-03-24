import React from "react";
import { Building, Calendar } from "lucide-react";

interface BookingCardProps {
  companyName: string;
  bookingDate: string;
  onEdit: () => void;
  onRemove: () => void;
}

export default function InterviewCard({
  companyName,
  bookingDate,
  onEdit,
  onRemove,
}: BookingCardProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-3 md:p-6 border-storke border-1 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-1 transition duration-300 ease-in-out space">
      {/* Company Info */}
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center space-x-3">
          <Building size={20} />
          <h2 className="card-title text-lg md:text-2xl font-bold">
            {companyName}
          </h2>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar size={20} />
          <h2 className="card-title text-sm md:text-base text-gray-500">
            {bookingDate}
          </h2>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row space-x-3 md:space-x-4 gap-3 mt-3">
        <button
          onClick={(e) => {e.preventDefault(); onEdit();}}
          className="px-3 md:px-6 py-1 md:py-2 m-0 border border-storke rounded-md hover:bg-gray-200 transition duration-300"
        >
          <div className="text-black text-sx md:text-base">Edit Booking</div>
        </button>
        <button
          onClick={(e) => {e.preventDefault(); onRemove();}}
          className="px-3 md:px-6 py-1 md:py-2 border border-storke rounded-md  bg-bgred hover:bg-red-400 hover:border-black border-1 transition duration-300"
        >
          <div className="text-black text-sm md:text-base">Remove Booking</div>
        </button>
      </div>
    </div>
  );
}
