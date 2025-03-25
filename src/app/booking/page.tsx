"use client"
import CardPanel from "@/components/CardPanel";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function booking() {
  const { data: session } = useSession();

  const [companies, setCompanies] = useState<CompanyModel[]>([]); // Store all companies
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  

  useEffect(() => {
    const fetchCompanies = async (page: number) => {
      try {
        const response = await axios.get<CompaniesApi>(
          `${process.env.BASE_API_URL}/companies?page=${page}`
        );
        if (response.data.success) {
          setCompanies(response.data.data as CompanyModel[]);
          setTotalPages(response.data.pagination?.maxPage as number);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setLoading(true);
    setCurrentPage(page);
  };

  return (
    <div>
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
          <CardPanel 
            companies={companies} 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          /> // Use Cardpanel here
        ) : (
          <div className="text-center text-xl text-red-700">
            No company data available
          </div>
        )}
      </div>
    </div>
  );
}
