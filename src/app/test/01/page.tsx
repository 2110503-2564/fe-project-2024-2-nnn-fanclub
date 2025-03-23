"use client";

import { useEffect, useState } from "react";
import TopMenu from "@/components/TopMenu";
import Header from "@/components/Header";
import InterviewsCard from "@/components/InterviewCard";
import CompanyCardManage from "@/components/CompanyCardManage";
import FormBooking from "@/components/FormBooking";

const mockCompanies = [
  {
    name: "Google",
    description: "Google is a search engine company",
    address: "Mountain View, California",
    telephone: "123-456-7890",
    website: "www.google.com",
  },
];
const round = 4;

export default function Home() {
  return (
    <div>
      <TopMenu />
      {/* <HomePage/> */}
      {/* Page Content */}

      <Header
        header="Edit Company"
        description="Edit company for Admin"
        buttonType="none"
      />

      <div className="w-screen bg-white py-4 md:p-4">
        <div className="bg-c2 p-2 md:p-6 space-y-4 md:space-y-6 mx-6 border-2 border-storke rounded-xl">
          <div className="font-bold text-center text-2xl md:text-3xl">
            My Interviews
          </div>
          {(() => {
            const interviewCards = [];
            for (let i = 0; i < 3; i++) {
              interviewCards.push(
                <InterviewsCard
                  key={i}
                  companyName="Google"
                  bookingDate="2021-10-12"
                  onEdit={() => console.log("Edit")}
                  onRemove={() => console.log("Remove")}
                />
              );
            }
            return interviewCards;
          })()}
        </div>
      </div>

      <div className="w-screen bg-white py-4 md:p-4">
        <div className="bg-c2 p-2 md:p-6 space-y-4 md:space-y-6 mx-6 border-2 border-storke rounded-xl">
          <div className="font-bold text-center text-2xl md:text-3xl">
            Companies
          </div>
          {(() => {
            const companies = [];
            for (let i = 0; i < 3; i++) {
              companies.push(
                <CompanyCardManage
                  key={i}
                  name="Google"
                  description="Google is a search engine company. Google is a search engine company. Google is a search engine company. Google is a search engine company"
                  address="Mountain View, California"
                  telephone="123-456-7890"
                  website="www.google.com"
                  onEdit={() => console.log("Edit")}
                  onRemove={() => console.log("Remove")}
                />
              );
            }
            return companies;
          })()}
        </div>
      </div>

      
        <FormBooking />
      
    </div>
  );
}
