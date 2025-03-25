import React, { useEffect, useState } from "react";
import getStats from "@/libs/getStats";
import { useSession } from "next-auth/react";

export default function CardStats() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const [totalBookings, setTotalBookings] = useState(0);
  const [totalCompany, setTotalCompany] = useState(0);

  useEffect(() => {
    console.log("Session: ", session);
    if (session) {
      getStats(session.verifiedToken)
        .then((res) => {
          if (res.data) {
            setLoading(false);
            setTotalBookings(res.data.totalBooking);
            setTotalCompany(res.data.totalCompany);
          }
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center px-4 md:px-8 py-2 md:py-4">
          <div className="text-black text-lg md:text-2xl font-bold pb-4">Stats for Admin</div>
          <div className="stats shadow w-full flex flex-col md:flex-row border border-storke shadow-md md:shadow-lg">
            <div className="stat place-items-center w-full">
              <div className="stat-title text-sm md:text-xl">Total Companies</div>
              <div className="stat-value text-base md:text-xl">{totalCompany}</div>
            </div>

            <div className="stat place-items-center w-full">
              <div className="stat-title text-sm md:text-xl">Total Booking</div>
              <div className="stat-value text-base md:text-xl">{totalBookings}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
