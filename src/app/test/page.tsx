"use client";

import { useEffect, useState } from "react";
import Topmenu from "@/components/Topmenu";
import Cardpanel from "@/components/Cardpanel";
import ProfileCard from "@/components/ProfileCard";
import axios from "axios";
import Homepage from "@/components/Homepage";

export default function Home() {
  const [companies, setCompanies] = useState<CompanyModel[]>([]); // Store all companies
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all company data from the API
    const fetchCompanies = async () => {
      try {
        const response = await axios.get<CompaniesApi>(
          `${process.env.BASE_API_URL}/companies` // API endpoint
        );
        if (response.data.success) {
          setCompanies(response.data.data as CompanyModel[]); // Assuming the API returns an array
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const mockUser = {
    _id: "2",
    name: "Demo User",
    telephone: "0987654321",
    email: "user@example.com",
    role: "user",
    createdAt: new Date(),
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfcf5]">
      {/* Topmenu */}
      <Topmenu />

      {/* Page Content */}
      <div className="flex flex-col items-center gap-4 flex-grow">
        <Homepage />
        {loading ? (
          <p>Loading...</p>
        ) : companies.length > 0 ? (
          <Cardpanel companies={companies} /> // Use Cardpanel here
        ) : (
          <p>No company data available</p>
        )}
        <ProfileCard user={mockUser} />
      </div>
    </div>
  );
}