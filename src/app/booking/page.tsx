"use client";
import CardPanel from "@/components/CardPanel";
import Header from "@/components/Header";
import TopMenu from "@/components/TopMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function booking() {
  const { data: session } = useSession();

  const [companies, setCompanies] = useState<CompanyModel[]>([]); // Store all companies
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_API_URL}/companies`);
        if (response.data.success) {
          setCompanies(response.data.data as CompanyModel[]);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <TopMenu />
      <Header
        header="Participating Companies"
        description="Browse all companies participating in our online job fair"
        buttonType="none"
        role={session?.user.role as string}
      />
      {/* Companies List */}
      <div className="flex flex-col items-center gap-4 flex-grow">
        {loading ? (
          <p>Loading...</p>
        ) : companies.length > 0 ? (
          <CardPanel companies={companies} /> // Use Cardpanel here
        ) : (
          <div className="text-center text-xl text-red-700">
            No company data available
          </div>
        )}
      </div>
    </div>
  );
}
