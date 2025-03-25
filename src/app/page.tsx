"use client";
import { useEffect, useState } from "react";
import TopMenu from "@/components/TopMenu";
import CardPanel from "@/components/CardPanel";
import axios from "axios";
import HomePage from "@/components/HomePage";
import CarouselImg from "@/components/CarouselImg";
import Footer from "@/components/Footer";

export default function Home() {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
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
    <div className="flex flex-col min-h-screen bg-c2 mt-[10vh]">
      <TopMenu />
      <div className="flex flex-col items-center gap-y-4 flex-grow">
        <HomePage />

        <CarouselImg />
        {/* Companies List */}
        {loading ? (
          <p>Loading...</p>
        ) : companies.length > 0 ? (
          <CardPanel
            companies={companies}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : (
          <div className="text-center text-xl text-red-700">
            No company data available
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
