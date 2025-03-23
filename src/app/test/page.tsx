"use client";

import { useEffect, useState } from "react";
import TopMenu from "@/components/TopMenu";
import CardPanel from "@/components/CardPanel";
import ProfileCard from "@/components/ProfileCard";
import axios from "axios";
import HomePage from "@/components/HomePage";

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
      <TopMenu />

      {/* Page Content */}
      <div className="flex flex-col items-center gap-4 flex-grow">
        <HomePage />
        {loading ? (
          <p>Loading...</p>
        ) : companies.length > 0 ? (
          <CardPanel companies={companies} /> // Use Cardpanel here
        ) : (
          <p>No company data available</p>
        )}
        <ProfileCard user={mockUser} />
      </div>
    </div>
  );
}