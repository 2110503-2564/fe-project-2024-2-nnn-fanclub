import React from "react";
import { Building, Calendar } from "lucide-react";
import Link from "next/link";

// type for the button options
type ButtonType = "Create Company" | "Book an Interview" | "none";

interface HeaderProps {
  header: string;
  description: string;
  buttonType: ButtonType;
  role: string;
}

export default function Header({
  header,
  description,
  buttonType,
  role,
}: HeaderProps) {
  let Btn = null;
  if (buttonType === "Create Company") {
    Btn = (
      <Link href="/admin/company/new">
        <button className="btn mt-5 px-2 py-1 md:px-4 md:py-2 bg-black text-white rounded-md text-xs hover:bg-white hover:text-black hover:border-black transition duration-500 ease-in-out">
          <span className="flex items-center space-x-2">
            <Building size={14} />
            <span className="text-sm md:text-base">Create Company</span>
          </span>
        </button>
      </Link>
    );
  } else if (buttonType === "Book an Interview") {
    Btn = (
      <Link href={role === "admin" ? "/admin/company" : "/booking"}>
        <button className="btn mt-5 px-2 py-1 md:px-4 md:py-2 bg-black text-white rounded-md text-xs hover:bg-white hover:text-black hover:border-black transition duration-500 ease-in-out">
          <span className="flex items-center space-x-2">
            <Calendar size={14} />
            <span className="text-sm md:text-base">Book an Interview</span>
          </span>
        </button>
      </Link>
    );
  } else {
    Btn = null;
  }

  return (
    <div className="p-6 bg-c2">
      <div className="flex flex-col md:flex-row justify-between items-center pb-4">
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold">{header}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        {Btn}
      </div>
    </div>
  );
}
