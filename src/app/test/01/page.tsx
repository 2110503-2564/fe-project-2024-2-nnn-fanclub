"use client";

import { useEffect, useState } from "react";
import Topmenu from "@/components/TopMenu";
import HomePage from "@/components/HomePage";
import CardPanel from "@/components/CardPanel";
import axios from "axios";
import Header from "@/components/Header";
import InterviewsCard from "@/components/InterviewCard";

const mockInterviews = [
  {
    companyName: "Google",
    bookingDate: "2021-10-12",
  },
  {
    companyName: "Facebook",
    bookingDate: "2021-10-15",
  },
  {
    companyName: "Amazon",
    bookingDate: "2021-10-18",
  },
];

export default function Home() {
  return (
    <div>
      <Topmenu />
      {/* <HomePage/> */}
      {/* Page Content */}

      <Header
        header="Edit Company"
        description="Edit company for Admin"
        buttonType="none"
      />

      <div className="w-screen bg-white p-4">
        <div className="bg-c2 p-6 space-y-4 md:space-y-6 m-6 border-2 border-storke rounded-xl">
          <div className="font-bold text-center text-2xl md:text-3xl">My Interviews</div>
          {mockInterviews.map((interview, index) => (
            <InterviewsCard
              key={index}
              companyName={interview.companyName}
              bookingDate={interview.bookingDate}
              onEdit={() => console.log("Edit")}
              onRemove={() => console.log("Remove")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
