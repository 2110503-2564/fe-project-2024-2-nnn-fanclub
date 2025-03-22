"use client";

import Topmenu from "@/components/Topmenu";
import CompanyCard from "@/components/CompanyCard";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  const mockCompany = {
    _id: "1",
    name: "TechGiant Inc.",
    address: "123 Silicon Valley, CA",
    website: "https://testtest.example.com",
    description: "Leading technology solutions provider.",
    telephone: "+1 (555) 123-4567",
  };

  const mockUser = {
    _id: "2",
    name: "Demo User",
    telephone: "0987654321",
    email: "user@example.com",
    role: "user",
    createdAt: new Date(),
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topmenu */}
      <Topmenu />

      {/* Page Content */}
      <div className="p-4 flex flex-col items-center gap-6 flex-grow">
        <CompanyCard company={mockCompany} />
        <ProfileCard user={mockUser} />
      </div>
    </div>
  );
}
